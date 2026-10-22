import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import L from 'leaflet';
import { useApp } from '../../context/AppContext';
import { SeoHead } from '../seo/SeoHead';
import {
  MapPin,
  Navigation,
  Compass,
  RefreshCw,
  Search,
  ExternalLink,
  Info,
  AlertTriangle,
  LocateFixed,
  Layers,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  Clock,
  Share2,
  Check,
  ChevronDown
} from 'lucide-react';

export interface MosqueItem {
  id: string | number;
  name: string;
  nameUrdu?: string;
  lat: number;
  lon: number;
  distance: number; // in meters
  address?: string;
  street?: string;
  city?: string;
  postcode?: string;
  website?: string;
  phone?: string;
  openingHours?: string;
  wheelchair?: string;
  femaleFacilities?: boolean;
  wuduFacilities?: boolean;
  jummah?: boolean;
  denomination?: string;
  osmUrl: string;
}

interface PopularCity {
  nameEn: string;
  nameUrdu: string;
  countryEn: string;
  countryUrdu: string;
  lat: number;
  lon: number;
}

const POPULAR_CITIES: PopularCity[] = [
  { nameEn: 'Makkah', nameUrdu: 'مکہ مکرمہ', countryEn: 'Saudi Arabia', countryUrdu: 'سعودی عرب', lat: 21.4225, lon: 39.8262 },
  { nameEn: 'Madinah', nameUrdu: 'مدینہ منورہ', countryEn: 'Saudi Arabia', countryUrdu: 'سعودی عرب', lat: 24.4672, lon: 39.6111 },
  { nameEn: 'Lahore', nameUrdu: 'لاہور', countryEn: 'Pakistan', countryUrdu: 'پاکستان', lat: 31.5204, lon: 74.3587 },
  { nameEn: 'Karachi', nameUrdu: 'کراچی', countryEn: 'Pakistan', countryUrdu: 'پاکستان', lat: 24.8607, lon: 67.0011 },
  { nameEn: 'Islamabad', nameUrdu: 'اسلام آباد', countryEn: 'Pakistan', countryUrdu: 'پاکستان', lat: 33.6844, lon: 73.0479 },
  { nameEn: 'London', nameUrdu: 'لندن', countryEn: 'United Kingdom', countryUrdu: 'برطانیہ', lat: 51.5074, lon: -0.1278 },
  { nameEn: 'New York', nameUrdu: 'نیویارک', countryEn: 'United States', countryUrdu: 'امریکہ', lat: 40.7128, lon: -74.0060 },
  { nameEn: 'Istanbul', nameUrdu: 'استنبول', countryEn: 'Turkey', countryUrdu: 'ترکیہ', lat: 41.0082, lon: 28.9784 },
  { nameEn: 'Dubai', nameUrdu: 'دبئی', countryEn: 'United Arab Emirates', countryUrdu: 'متحدہ عرب امارات', lat: 25.2048, lon: 55.2708 },
  { nameEn: 'Toronto', nameUrdu: 'ٹورنٹو', countryEn: 'Canada', countryUrdu: 'کینیڈا', lat: 43.6532, lon: -79.3832 },
];

// Haversine formula to compute distance in meters between two coordinates
function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371e3; // Earth radius in meters
  const phi1 = (lat1 * Math.PI) / 180;
  const phi2 = (lat2 * Math.PI) / 180;
  const deltaPhi = ((lat2 - lat1) * Math.PI) / 180;
  const deltaLambda = ((lon2 - lon1) * Math.PI) / 180;

  const a =
    Math.sin(deltaPhi / 2) * Math.sin(deltaPhi / 2) +
    Math.cos(phi1) * Math.cos(phi2) * Math.sin(deltaLambda / 2) * Math.sin(deltaLambda / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

function formatDistance(meters: number, isUrdu: boolean): string {
  if (meters < 1000) {
    const m = Math.round(meters);
    return isUrdu ? `${m} میٹر` : `${m} m`;
  }
  const km = (meters / 1000).toFixed(1);
  return isUrdu ? `${km} کلومیٹر` : `${km} km`;
}

function estimateTravelTimes(meters: number, isUrdu: boolean): { walk: string; drive: string } {
  const walkMins = Math.max(1, Math.round(meters / 80));
  const driveMins = Math.max(1, Math.round(meters / 416));

  const formatMin = (mins: number) => {
    if (mins >= 60) {
      const hrs = Math.floor(mins / 60);
      const rem = mins % 60;
      return isUrdu
        ? `${hrs} گھنٹہ ${rem > 0 ? rem + ' منٹ' : ''}`
        : `${hrs}h ${rem > 0 ? rem + 'm' : ''}`;
    }
    return isUrdu ? `${mins} منٹ` : `${mins} min`;
  };

  return {
    walk: formatMin(walkMins),
    drive: formatMin(driveMins),
  };
}

// In-memory cache for Overpass queries to respect rate limits and reduce bandwidth
const queryCache = new Map<string, { timestamp: number; data: MosqueItem[] }>();
const CACHE_TTL_MS = 10 * 60 * 1000; // 10 minutes cache

export const NearbyMosques: React.FC = () => {
  const { contentLang, userMode } = useApp();
  const isUrdu = contentLang === 'urdu';
  const isKids = userMode === 'kids';

  // Geolocation & search states
  const [coords, setCoords] = useState<{ lat: number; lon: number } | null>(null);
  const [locationLabel, setLocationLabel] = useState<string>('');
  const [hasRequestedLocation, setHasRequestedLocation] = useState<boolean>(false);
  const [geoStatus, setGeoStatus] = useState<
    'idle' | 'prompting' | 'requesting' | 'granted' | 'denied' | 'unavailable' | 'timeout'
  >('idle');
  const [geoErrorMessage, setGeoErrorMessage] = useState<string>('');

  // Mosque search & filter states
  const [radiusKm, setRadiusKm] = useState<number>(5);
  const [mosques, setMosques] = useState<MosqueItem[]>([]);
  const [isLoadingMosques, setIsLoadingMosques] = useState<boolean>(false);
  const [apiError, setApiError] = useState<string | null>(null);
  const [selectedMosqueId, setSelectedMosqueId] = useState<string | number | null>(null);

  // Search by text & amenities
  const [searchFilter, setSearchFilter] = useState<string>('');
  const [filterWuduOnly, setFilterWuduOnly] = useState<boolean>(false);
  const [filterWomenOnly, setFilterWomenOnly] = useState<boolean>(false);
  const [filterJummahOnly, setFilterJummahOnly] = useState<boolean>(false);

  // City geocoding search
  const [cityInput, setCityInput] = useState<string>('');
  const [isGeocoding, setIsGeocoding] = useState<boolean>(false);
  const [copiedId, setCopiedId] = useState<string | number | null>(null);

  // Leaflet map refs
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markersLayerRef = useRef<L.LayerGroup | null>(null);
  const userMarkerRef = useRef<L.Marker | null>(null);
  const radiusCircleRef = useRef<L.Circle | null>(null);

  // Request browser geolocation
  const requestCurrentLocation = useCallback(() => {
    setHasRequestedLocation(true);
    setGeoStatus('requesting');
    setGeoErrorMessage('');
    setApiError(null);

    if (!navigator.geolocation) {
      setGeoStatus('unavailable');
      setGeoErrorMessage(
        isUrdu
          ? 'آپ کا براؤزر لوکیشن سروس کو سپورٹ نہیں کرتا۔ برائے مہربانی نیچے دیے گئے شہروں میں سے انتخاب کریں۔'
          : 'Geolocation is not supported by your browser. Please select a city below.'
      );
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setCoords({ lat: latitude, lon: longitude });
        setLocationLabel(isUrdu ? 'آپ کا موجودہ مقام' : 'Current Location');
        setGeoStatus('granted');
      },
      (error) => {
        console.warn('Geolocation error:', error);
        if (error.code === error.PERMISSION_DENIED) {
          setGeoStatus('denied');
          setGeoErrorMessage(
            isUrdu
              ? 'لوکیشن کی اجازت نہیں دی گئی۔ آپ براؤزر سیٹنگز سے اجازت دے سکتے ہیں یا نیچے سے اپنا شہر منتخب کر سکتے ہیں۔'
              : 'Location permission was denied. You can allow location in your browser settings or select a city below.'
          );
        } else if (error.code === error.TIMEOUT) {
          setGeoStatus('timeout');
          setGeoErrorMessage(
            isUrdu
              ? 'لوکیشن معلوم کرنے کا وقت ختم ہو گیا۔ دوبارہ کوشش کریں یا شہر منتخب کریں۔'
              : 'Location request timed out. Please retry or choose a city below.'
          );
        } else {
          setGeoStatus('unavailable');
          setGeoErrorMessage(
            isUrdu
              ? 'موجودہ مقام معلوم نہیں ہو سکا۔ برائے مہربانی شہر منتخب کریں۔'
              : 'Location is currently unavailable. Please pick a city below.'
          );
        }
      },
      {
        enableHighAccuracy: true,
        timeout: 12000,
        maximumAge: 60000,
      }
    );
  }, [isUrdu]);

  // Select a preset city
  const handleSelectCity = (city: PopularCity) => {
    setHasRequestedLocation(true);
    setCoords({ lat: city.lat, lon: city.lon });
    setLocationLabel(isUrdu ? `${city.nameUrdu} (${city.countryUrdu})` : `${city.nameEn}, ${city.countryEn}`);
    setGeoStatus('granted');
    setGeoErrorMessage('');
    setApiError(null);
  };

  // Search city via Nominatim OpenStreetMap (free, with rate limit & User-Agent)
  const handleGeocodeSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!cityInput.trim()) return;

    setIsGeocoding(true);
    setApiError(null);
    try {
      const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
        cityInput.trim()
      )}&limit=1`;
      const res = await fetch(url, {
        headers: {
          'Accept-Language': isUrdu ? 'ur,en' : 'en',
        },
      });
      if (!res.ok) throw new Error('Geocoding failed');
      const data = await res.json();
      if (Array.isArray(data) && data.length > 0) {
        const place = data[0];
        const lat = parseFloat(place.lat);
        const lon = parseFloat(place.lon);
        setHasRequestedLocation(true);
        setCoords({ lat, lon });
        setLocationLabel(place.display_name.split(',')[0]);
        setGeoStatus('granted');
        setCityInput('');
      } else {
        setApiError(
          isUrdu
            ? 'مطلوبہ شہر یا علاقہ نہیں مل سکا۔ برائے مہربانی درست نام درج کریں۔'
            : 'City or area not found. Please try a different spelling or select from popular cities.'
        );
      }
    } catch {
      setApiError(
        isUrdu
          ? 'شہر کی تلاش میں رابطہ نہیں ہو سکا۔ براہ کرم انٹرنیٹ چیک کریں یا فہرست سے منتخب کریں۔'
          : 'Unable to connect to location search. Please verify your internet connection or choose from popular cities.'
      );
    } finally {
      setIsGeocoding(false);
    }
  };

  // Fetch Mosques from Overpass API
  const fetchNearbyMosques = useCallback(
    async (lat: number, lon: number, radiusMeters: number) => {
      const cacheKey = `${lat.toFixed(3)}_${lon.toFixed(3)}_${radiusMeters}`;
      const cached = queryCache.get(cacheKey);
      if (cached && Date.now() - cached.timestamp < CACHE_TTL_MS) {
        setMosques(cached.data);
        return;
      }

      setIsLoadingMosques(true);
      setApiError(null);

      const query = `[out:json][timeout:25];
(
  node["amenity"="place_of_worship"]["religion"="muslim"](around:${radiusMeters},${lat},${lon});
  way["amenity"="place_of_worship"]["religion"="muslim"](around:${radiusMeters},${lat},${lon});
  relation["amenity"="place_of_worship"]["religion"="muslim"](around:${radiusMeters},${lat},${lon});
);
out center tags;`;

      const endpoints = [
        'https://overpass-api.de/api/interpreter',
        'https://lz4.overpass-api.de/api/interpreter',
        'https://overpass.kumi.systems/api/interpreter',
      ];

      let lastError: Error | null = null;
      let success = false;

      for (const endpoint of endpoints) {
        try {
          const response = await fetch(endpoint, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: `data=${encodeURIComponent(query)}`,
          });

          if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
          }

          const result = await response.json();
          const elements: Array<{
            id: number;
            type: 'node' | 'way' | 'relation';
            lat?: number;
            lon?: number;
            center?: { lat: number; lon: number };
            tags?: Record<string, string>;
          }> = result.elements || [];

          const items: MosqueItem[] = elements
            .map((el) => {
              const mLat = el.type === 'node' ? el.lat : el.center?.lat;
              const mLon = el.type === 'node' ? el.lon : el.center?.lon;
              if (typeof mLat !== 'number' || typeof mLon !== 'number') return null;

              const dist = calculateDistance(lat, lon, mLat, mLon);
              const tags = el.tags || {};

              const nameEn = tags['name:en'] || tags.name || tags['name:ur'] || '';
              const nameUr = tags['name:ur'] || tags.name || tags['name:en'] || '';
              const fallbackName = isUrdu ? 'جامع مسجد' : 'Masjid / Mosque';
              const displayName = nameEn || nameUr || fallbackName;

              const street = tags['addr:street'];
              const houseNum = tags['addr:housenumber'];
              const city = tags['addr:city'] || tags['addr:suburb'] || tags['addr:district'];
              const postcode = tags['addr:postcode'];
              const addressParts = [houseNum, street, city, postcode].filter(Boolean);
              const formattedAddress = addressParts.length > 0 ? addressParts.join(', ') : tags['addr:full'];

              const female =
                tags['female'] === 'yes' ||
                tags['female:separate'] === 'yes' ||
                tags['women'] === 'yes' ||
                Boolean(tags['female:prayer_room']);
              const wudu =
                tags['wudu'] === 'yes' ||
                tags['ablution'] === 'yes' ||
                tags['washroom'] === 'yes' ||
                tags['toilets'] === 'yes';
              const jummah =
                tags['friday_prayer'] === 'yes' ||
                tags['jummah'] === 'yes' ||
                (tags.name && tags.name.toLowerCase().includes('jami')) ||
                (tags.name && tags.name.includes('جامع'));

              return {
                id: `${el.type}_${el.id}`,
                name: displayName,
                nameUrdu: nameUr,
                lat: mLat,
                lon: mLon,
                distance: dist,
                address: formattedAddress,
                street,
                city,
                postcode,
                website: tags.website || tags['contact:website'],
                phone: tags.phone || tags['contact:phone'],
                openingHours: tags.opening_hours,
                wheelchair: tags.wheelchair,
                femaleFacilities: female,
                wuduFacilities: wudu,
                jummah,
                denomination: tags.denomination,
                osmUrl: `https://www.openstreetmap.org/${el.type}/${el.id}`,
              } as MosqueItem;
            })
            .filter((m): m is MosqueItem => m !== null)
            .sort((a, b) => a.distance - b.distance);

          setMosques(items);
          queryCache.set(cacheKey, { timestamp: Date.now(), data: items });
          success = true;
          break;
        } catch (err: unknown) {
          lastError = err instanceof Error ? err : new Error(String(err));
        }
      }

      if (!success) {
        console.error('All Overpass API endpoints failed:', lastError);
        setApiError(
          isUrdu
            ? 'مساجد کی معلومات حاصل کرنے میں عارضی مسئلہ پیش آیا۔ براہ کرم ریفریش بٹن دبائیں یا کچھ دیر بعد کوشش کریں۔'
            : 'Unable to connect to OpenStreetMap Overpass servers. Please try clicking the refresh button.'
        );
      }

      setIsLoadingMosques(false);
    },
    [isUrdu]
  );

  // Trigger mosque fetch when coordinates or radius change
  useEffect(() => {
    if (coords) {
      fetchNearbyMosques(coords.lat, coords.lon, radiusKm * 1000);
    }
  }, [coords, radiusKm, fetchNearbyMosques]);

  // Initialize and update Leaflet Map
  useEffect(() => {
    if (!mapContainerRef.current) return;

    const centerLat = coords ? coords.lat : 21.4225;
    const centerLon = coords ? coords.lon : 39.8262;
    const initialZoom = coords ? (radiusKm <= 1 ? 15 : radiusKm <= 5 ? 13 : 11) : 12;

    if (!mapInstanceRef.current) {
      const map = L.map(mapContainerRef.current, {
        center: [centerLat, centerLon],
        zoom: initialZoom,
        zoomControl: true,
        attributionControl: true,
      });

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener noreferrer">OpenStreetMap</a> contributors',
        maxZoom: 19,
      }).addTo(map);

      map.on('click', (e: L.LeafletMouseEvent) => {
        const { lat, lng } = e.latlng;
        setCoords({ lat, lon: lng });
        setLocationLabel(isUrdu ? 'نقشے پر منتخب کردہ مقام' : 'Selected on Map');
        setHasRequestedLocation(true);
        setGeoStatus('granted');
      });

      const markersGroup = L.layerGroup().addTo(map);
      markersLayerRef.current = markersGroup;
      mapInstanceRef.current = map;
    } else {
      mapInstanceRef.current.setView([centerLat, centerLon], initialZoom);
    }
  }, [coords, radiusKm, isUrdu]);

  // Clean unmount of map
  useEffect(() => {
    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  // Update Markers when mosques or coords change
  useEffect(() => {
    const map = mapInstanceRef.current;
    const markersLayer = markersLayerRef.current;
    if (!map || !markersLayer) return;

    markersLayer.clearLayers();

    // 1. Draw User Location Marker and Radius Circle
    if (coords) {
      if (radiusCircleRef.current) {
        map.removeLayer(radiusCircleRef.current);
      }
      const radiusCircle = L.circle([coords.lat, coords.lon], {
        radius: radiusKm * 1000,
        color: '#10b981',
        weight: 1.5,
        fillColor: '#10b981',
        fillOpacity: 0.08,
      }).addTo(map);
      radiusCircleRef.current = radiusCircle;

      const userIcon = L.divIcon({
        className: 'user-location-custom-marker',
        html: `
          <div class="relative flex items-center justify-center">
            <div class="user-pulse-marker absolute w-7 h-7 rounded-full bg-sky-400"></div>
            <div class="w-4 h-4 rounded-full bg-sky-600 border-2 border-white shadow-md relative z-10"></div>
          </div>
        `,
        iconSize: [28, 28],
        iconAnchor: [14, 14],
      });

      const userMarker = L.marker([coords.lat, coords.lon], { icon: userIcon }).addTo(markersLayer);
      userMarker.bindPopup(`
        <div style="font-family: inherit; padding: 10px 14px; text-align: center;">
          <div style="font-size: 11px; font-weight: 700; color: #0284c7; text-transform: uppercase;">
            ${isUrdu ? 'آپ کا مقام' : 'Your Location'}
          </div>
          <div style="font-size: 13px; font-weight: 600; color: #0f172a; margin-top: 2px;">
            ${locationLabel || (isUrdu ? 'موجودہ کوآرڈینیٹس' : 'Current GPS Coordinates')}
          </div>
        </div>
      `);
      userMarkerRef.current = userMarker;
    }

    // 2. Draw Mosque Markers
    mosques.forEach((m) => {
      const isSelected = m.id === selectedMosqueId;
      const distFormatted = formatDistance(m.distance, isUrdu);

      const mosqueIcon = L.divIcon({
        className: 'custom-mosque-pin',
        html: `
          <div style="cursor: pointer; transform: translate(-50%, -100%); transition: transform 0.2s;">
            <div style="
              width: 32px;
              height: 38px;
              background: ${isSelected ? '#d97706' : '#047857'};
              border: 2px solid #ffffff;
              border-radius: 16px 16px 16px 2px;
              transform: rotate(-45deg);
              box-shadow: 0 4px 10px rgba(0,0,0,0.25);
              display: flex;
              align-items: center;
              justify-content: center;
              position: relative;
            ">
              <span style="
                transform: rotate(45deg);
                color: #ffffff;
                font-size: 15px;
                line-height: 1;
              ">🕌</span>
            </div>
          </div>
        `,
        iconSize: [32, 38],
        iconAnchor: [16, 38],
        popupAnchor: [0, -38],
      });

      const marker = L.marker([m.lat, m.lon], { icon: mosqueIcon }).addTo(markersLayer);

      const safeName = m.name.replace(/"/g, '&quot;');
      const safeAddr = (m.address || '').replace(/"/g, '&quot;');
      const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${m.lat},${m.lon}`;

      marker.bindPopup(`
        <div style="min-width: 200px; padding: 12px; font-family: inherit;">
          <div style="display: flex; align-items: center; justify-content: space-between; gap: 8px; margin-bottom: 4px;">
            <span style="background: #ecfdf5; color: #047857; font-size: 11px; font-weight: 700; padding: 2px 8px; border-radius: 12px;">
              ${distFormatted}
            </span>
            <span style="font-size: 11px; color: #64748b;">
              ${m.jummah ? '🕌 ' + (isUrdu ? 'نمازِ جمعہ' : 'Jumu\'ah') : ''}
            </span>
          </div>
          <div style="font-size: 14px; font-weight: 700; color: #0f172a; margin-bottom: 4px; line-height: 1.3;">
            ${safeName}
          </div>
          ${safeAddr ? `<div style="font-size: 11px; color: #475569; margin-bottom: 8px;">📍 ${safeAddr}</div>` : ''}
          <a
            href="${directionsUrl}"
            target="_blank"
            rel="noopener noreferrer"
            style="
              display: flex;
              align-items: center;
              justify-content: center;
              gap: 6px;
              background: #047857;
              color: #ffffff;
              padding: 7px 12px;
              border-radius: 8px;
              font-size: 12px;
              font-weight: 700;
              text-decoration: none;
              text-align: center;
              margin-top: 6px;
            "
          >
            🧭 ${isUrdu ? 'راستہ معلوم کریں (گوگل میپس)' : 'Get Directions'}
          </a>
        </div>
      `);

      marker.on('click', () => {
        setSelectedMosqueId(m.id);
      });
    });
  }, [mosques, coords, radiusKm, selectedMosqueId, isUrdu, locationLabel]);

  // Zoom to a specific mosque when user clicks "View on Map" in the list
  const handleFocusMosque = (mosque: MosqueItem) => {
    setSelectedMosqueId(mosque.id);
    if (mapInstanceRef.current) {
      mapInstanceRef.current.setView([mosque.lat, mosque.lon], 16, { animate: true });
      mapContainerRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  // Filtered mosques based on search input and toggles
  const filteredMosques = useMemo(() => {
    return mosques.filter((m) => {
      if (searchFilter.trim()) {
        const query = searchFilter.toLowerCase();
        const matchesName = m.name.toLowerCase().includes(query);
        const matchesAddress = m.address ? m.address.toLowerCase().includes(query) : false;
        if (!matchesName && !matchesAddress) return false;
      }
      if (filterWuduOnly && !m.wuduFacilities) return false;
      if (filterWomenOnly && !m.femaleFacilities) return false;
      if (filterJummahOnly && !m.jummah) return false;
      return true;
    });
  }, [mosques, searchFilter, filterWuduOnly, filterWomenOnly, filterJummahOnly]);

  // Copy GPS coordinates
  const handleCopyCoords = (mosque: MosqueItem) => {
    const text = `${mosque.lat.toFixed(6)}, ${mosque.lon.toFixed(6)}`;
    navigator.clipboard.writeText(text);
    setCopiedId(mosque.id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-12">
      <SeoHead
        title="Nearby Mosques Finder • Masjids Near Me with Directions | IslamIQ"
        description="Find nearby mosques and masjids on an interactive map. Search by radius, view distances, wudu facilities, and open turn-by-turn Google Maps directions."
        canonicalPath="/nearby-mosques"
        isUrdu={isUrdu}
        breadcrumbs={[
          { name: isUrdu ? 'ہوم' : 'Home', url: '/' },
          { name: isUrdu ? 'اسلامی ٹولز' : 'Tools', url: '/nearby-mosques' },
          { name: isUrdu ? 'قریبی مساجد' : 'Nearby Mosques', url: '/nearby-mosques' },
        ]}
        faqs={[
          {
            question: isUrdu ? 'اسلام آئی کیو قریبی مساجد کیسے تلاش کرتا ہے؟' : 'How does IslamIQ find nearby mosques?',
            answer: isUrdu
              ? 'اسلام آئی کیو اوپن اسٹریٹ میپ (OpenStreetMap) کے تصدیق شدہ اوور پاس ڈیٹا بیس سے مساجد کی معلومات اور آپ کے فون کی جی پی ایس لوکیشن استعمال کرتا ہے۔'
              : 'IslamIQ queries OpenStreetMap verified place of worship data through the Overpass API using your browser device coordinates locally.',
          },
          {
            question: isUrdu ? 'کیا میری لوکیشن کہیں محفوظ کی جاتی ہے؟' : 'Is my location stored or sent to a server?',
            answer: isUrdu
              ? 'بالکل نہیں! آپ کی لوکیشن صرف آپ کے براؤزر کے اندر عارضی طور پر فاصلہ نکالنے کے لیے استعمال ہوتی ہے۔ ہم کوئی ذاتی ڈیٹا محفوظ نہیں کرتے۔'
              : 'No. Your location is processed solely within your browser locally to calculate distances and render map markers. We never store coordinates in any database.',
          },
        ]}
      />

      {/* Header Banner */}
      <header className="text-center space-y-3 sm:space-y-4 border-b border-slate-200 pb-6 sm:pb-8">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold">
          <MapPin className="w-4 h-4 text-emerald-600" />
          <span>{isUrdu ? 'اوپن اسٹریٹ میپ • قریبی مساجد تلاش کریں' : 'Interactive Mosque Finder • OpenStreetMap'}</span>
        </div>
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 leading-tight">
          {isUrdu ? 'قریبی مساجد اور باجماعت نماز' : 'Nearby Mosques & Masjids'}
        </h1>
        <p className="text-slate-600 max-w-2xl mx-auto text-xs sm:text-sm md:text-base leading-relaxed">
          {isUrdu
            ? 'اپنے ارد گرد واقع مساجد، درست فاصلہ، پیدل اور ڈرائیونگ کا وقت معلوم کریں اور گوگل میپس سے باآسانی راستہ حاصل کریں۔'
            : 'Locate masjids near your current location or any selected city with interactive map navigation, verified distances, and direct directions.'}
        </p>
      </header>

      {/* Geolocation Permission & Explainer Card (Shows prominently before location is acquired or if denied) */}
      {!hasRequestedLocation && (
        <section className="bg-gradient-to-br from-emerald-900 via-emerald-800 to-teal-900 text-white rounded-3xl p-6 sm:p-8 shadow-lg border border-emerald-700/50 relative overflow-hidden">
          <div className="absolute top-0 right-0 -mt-8 -mr-8 w-44 h-44 rounded-full bg-emerald-600/20 blur-2xl pointer-events-none"></div>

          <div className="max-w-2xl mx-auto text-center space-y-4 relative z-10">
            <div className="w-14 h-14 mx-auto rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20 text-goldAccent shadow-inner">
              <Navigation className="w-7 h-7 text-emerald-300" />
            </div>

            <h2 className="text-lg sm:text-2xl font-bold tracking-tight text-white">
              {isUrdu ? 'اپنے قریب مساجد دیکھنے کے لیے لوکیشن کی اجازت دیں' : 'Find Mosques Near Your Current Location'}
            </h2>

            <p className="text-xs sm:text-sm text-emerald-100/90 leading-relaxed max-w-xl mx-auto">
              {isUrdu
                ? 'اسلام آئی کیو آپ کے قریبی مساجد تلاش کرنے کے لیے آپ کی ڈیوائس کی لوکیشن استعمال کرتا ہے۔ آپ کا مقام مکمل طور پر محفوظ ہے اور کسی سرور پر اپلوڈ نہیں کیا جاتا۔'
                : 'IslamIQ uses your approximate GPS coordinates locally in your browser to discover nearby masjids and calculate walking/driving distances. Your location is never stored or uploaded.'}
            </p>

            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                type="button"
                onClick={requestCurrentLocation}
                disabled={geoStatus === 'requesting'}
                className="w-full sm:w-auto px-6 py-3 rounded-2xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-slate-950 font-bold text-sm shadow-md transition-all active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
              >
                {geoStatus === 'requesting' ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>{isUrdu ? 'لوکیشن معلوم ہو رہی ہے...' : 'Detecting Location...'}</span>
                  </>
                ) : (
                  <>
                    <LocateFixed className="w-4 h-4 text-slate-900" />
                    <span>{isUrdu ? 'موجودہ مقام استعمال کریں' : 'Allow & Use My Location'}</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={() => handleSelectCity(POPULAR_CITIES[0])}
                className="w-full sm:w-auto px-5 py-3 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-medium text-xs sm:text-sm border border-white/20 transition-all cursor-pointer"
              >
                {isUrdu ? 'یا مکہ مکرمہ سے تلاش شروع کریں' : 'Or explore around Makkah'}
              </button>
            </div>
          </div>
        </section>
      )}

      {/* Permission Denied or Error Banner */}
      {(geoStatus === 'denied' || geoStatus === 'unavailable' || geoStatus === 'timeout') && (
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-amber-900">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <h3 className="text-sm font-bold">
                {isUrdu ? 'لوکیشن دستیاب نہیں ہو سکی' : 'Location Permission or GPS Notice'}
              </h3>
              <p className="text-xs text-amber-800/90 mt-0.5">{geoErrorMessage}</p>
            </div>
          </div>
          <button
            type="button"
            onClick={requestCurrentLocation}
            className="px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-semibold text-xs transition-colors shrink-0 flex items-center gap-1.5 cursor-pointer"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>{isUrdu ? 'دوبارہ کوشش کریں' : 'Retry Permission'}</span>
          </button>
        </div>
      )}

      {/* Location Bar & City Selector */}
      <section className="bg-white rounded-3xl border border-slate-200 p-4 sm:p-5 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold">
              <Compass className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs text-slate-500 font-medium">
                {isUrdu ? 'موجودہ تلاش کا مرکز:' : 'Current Search Center:'}
              </div>
              <div className="text-sm sm:text-base font-bold text-slate-900 flex items-center gap-1.5">
                <span>{locationLabel || (coords ? `${coords.lat.toFixed(4)}, ${coords.lon.toFixed(4)}` : (isUrdu ? 'کوئی مقام منتخب نہیں' : 'No Location Selected'))}</span>
                {coords && (
                  <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full">
                    GPS
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={requestCurrentLocation}
              title={isUrdu ? 'موجودہ جی پی ایس لوکیشن اپ ڈیٹ کریں' : 'Update Current GPS Location'}
              className="px-3 py-1.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <LocateFixed className="w-3.5 h-3.5" />
              <span>{isUrdu ? 'میری لوکیشن' : 'My GPS'}</span>
            </button>

            <button
              type="button"
              onClick={() => {
                if (coords) fetchNearbyMosques(coords.lat, coords.lon, radiusKm * 1000);
              }}
              disabled={isLoadingMosques || !coords}
              title={isUrdu ? 'مساجد ریفریش کریں' : 'Refresh Mosque Query'}
              className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold flex items-center gap-1.5 transition-colors disabled:opacity-50 cursor-pointer"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isLoadingMosques ? 'animate-spin text-emerald-600' : ''}`} />
              <span>{isUrdu ? 'ریفریش' : 'Refresh'}</span>
            </button>
          </div>
        </div>

        {/* City Quick Selector Chips */}
        <div className="space-y-2">
          <div className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
            <Layers className="w-3.5 h-3.5 text-slate-500" />
            <span>{isUrdu ? 'یا فوری شہر منتخب کریں:' : 'Or choose a city to explore:'}</span>
          </div>
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1.5 no-scrollbar">
            {POPULAR_CITIES.map((city) => (
              <button
                key={city.nameEn}
                type="button"
                onClick={() => handleSelectCity(city)}
                className={`px-3 py-1 rounded-xl text-xs font-medium whitespace-nowrap transition-all border cursor-pointer ${
                  locationLabel.includes(city.nameEn) || locationLabel.includes(city.nameUrdu)
                    ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs'
                    : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200'
                }`}
              >
                {isUrdu ? city.nameUrdu : city.nameEn}
              </button>
            ))}
          </div>
        </div>

        {/* Manual City/Address Geocoding Form */}
        <form onSubmit={handleGeocodeSearch} className="flex gap-2">
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={cityInput}
              onChange={(e) => setCityInput(e.target.value)}
              placeholder={
                isUrdu
                  ? 'شہر یا بستی کا نام تلاش کریں (مثلاً: لاہور، راولپنڈی، برمنگھم)...'
                  : 'Search any city, neighborhood, or postal code...'
              }
              className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>
          <button
            type="submit"
            disabled={isGeocoding || !cityInput.trim()}
            className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white font-bold text-xs sm:text-sm rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            {isGeocoding ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Search className="w-3.5 h-3.5" />}
            <span>{isUrdu ? 'تلاش' : 'Search'}</span>
          </button>
        </form>
      </section>

      {/* Radius & Filters Bar */}
      <section className="bg-white rounded-3xl border border-slate-200 p-4 sm:p-5 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          {/* Radius selector buttons */}
          <div>
            <div className="text-xs font-bold text-slate-700 mb-1.5">
              {isUrdu ? 'تلاش کا دائرہ (Search Radius):' : 'Search Radius:'}
            </div>
            <div className="inline-flex p-1 bg-slate-100 rounded-2xl gap-1">
              {[
                { km: 1, labelEn: '1 km (Walk)', labelUr: '۱ کلومیٹر' },
                { km: 5, labelEn: '5 km (Drive)', labelUr: '۵ کلومیٹر' },
                { km: 10, labelEn: '10 km (Area)', labelUr: '۱۰ کلومیٹر' },
                { km: 25, labelEn: '25 km (Wider)', labelUr: '۲۵ کلومیٹر' },
              ].map((r) => (
                <button
                  key={r.km}
                  type="button"
                  onClick={() => setRadiusKm(r.km)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    radiusKm === r.km
                      ? 'bg-emerald-600 text-white shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {isUrdu ? r.labelUr : r.labelEn}
                </button>
              ))}
            </div>
          </div>

          {/* Filter options */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => setFilterWuduOnly(!filterWuduOnly)}
              className={`px-2.5 py-1.5 rounded-xl text-xs font-medium border transition-colors cursor-pointer ${
                filterWuduOnly
                  ? 'bg-teal-50 border-teal-500 text-teal-800 font-bold'
                  : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
              }`}
            >
              💧 {isUrdu ? 'وضو خانہ' : 'Wudu Facility'}
            </button>
            <button
              type="button"
              onClick={() => setFilterWomenOnly(!filterWomenOnly)}
              className={`px-2.5 py-1.5 rounded-xl text-xs font-medium border transition-colors cursor-pointer ${
                filterWomenOnly
                  ? 'bg-teal-50 border-teal-500 text-teal-800 font-bold'
                  : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
              }`}
            >
              🧕 {isUrdu ? 'خواتین کی جگہ' : "Women's Area"}
            </button>
            <button
              type="button"
              onClick={() => setFilterJummahOnly(!filterJummahOnly)}
              className={`px-2.5 py-1.5 rounded-xl text-xs font-medium border transition-colors cursor-pointer ${
                filterJummahOnly
                  ? 'bg-teal-50 border-teal-500 text-teal-800 font-bold'
                  : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
              }`}
            >
              🕌 {isUrdu ? 'نمازِ جمعہ' : "Jumu'ah"}
            </button>
          </div>
        </div>

        {/* Search within results */}
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchFilter}
            onChange={(e) => setSearchFilter(e.target.value)}
            placeholder={
              isUrdu
                ? 'نتائج میں مسجد کے نام یا گلی سے تلاش کریں...'
                : 'Filter mosques by name, street, or keyword...'
            }
            className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>
      </section>

      {/* Interactive Map Box */}
      <section className="bg-white rounded-3xl border border-slate-200 p-3 sm:p-4 shadow-sm overflow-hidden">
        <div className="flex items-center justify-between px-2 pb-3">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="text-xs font-bold text-slate-800">
              {isUrdu ? 'انٹرایکٹو نقشہ (اوپن اسٹریٹ میپ)' : 'Interactive Mosque Map'}
            </span>
          </div>
          <div className="text-[11px] text-slate-500">
            {isUrdu
              ? `${filteredMosques.length} مساجد نقشے پر موجود ہیں`
              : `${filteredMosques.length} mosques in radius`}
          </div>
        </div>

        {/* Map Container */}
        <div className="relative w-full h-[320px] sm:h-[420px] rounded-2xl overflow-hidden border border-slate-200 z-0">
          <div ref={mapContainerRef} className="w-full h-full z-0" />

          {/* Map Loading Overlay */}
          {isLoadingMosques && (
            <div className="absolute inset-0 bg-white/70 backdrop-blur-xs flex flex-col items-center justify-center gap-2 z-10">
              <div className="w-8 h-8 border-3 border-emerald-600 border-t-transparent rounded-full animate-spin"></div>
              <span className="text-xs font-bold text-emerald-900">
                {isUrdu ? 'اوپن اسٹریٹ میپ سے مساجد تلاش کی جا رہی ہیں...' : 'Querying nearby masjids from OpenStreetMap...'}
              </span>
            </div>
          )}

          {/* Map Attribution Tag overlay */}
          <div className="absolute bottom-1 right-1 bg-white/85 backdrop-blur-xs text-[10px] text-slate-600 px-2 py-0.5 rounded-md pointer-events-none z-10 border border-slate-200/80">
            © OpenStreetMap contributors • Overpass API
          </div>
        </div>
      </section>

      {/* API Error Notification */}
      {apiError && (
        <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 text-xs sm:text-sm flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <div className="font-bold">{isUrdu ? 'رابطہ کا مسئلہ' : 'Network / API Notice'}</div>
            <div>{apiError}</div>
          </div>
        </div>
      )}

      {/* Mosque List Section */}
      <section className="space-y-3">
        <div className="flex items-center justify-between px-1">
          <h2 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
            <span>{isUrdu ? 'قریبی مساجد کی فہرست' : 'Nearby Mosques List'}</span>
            <span className="text-xs bg-emerald-100 text-emerald-800 font-extrabold px-2.5 py-0.5 rounded-full">
              {filteredMosques.length}
            </span>
          </h2>
          <span className="text-xs text-slate-500">
            {isUrdu ? 'فاصلے کے اعتبار سے ترتیب شدہ' : 'Sorted by distance'}
          </span>
        </div>

        {/* Loading state skeleton */}
        {isLoadingMosques && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs animate-pulse space-y-3"
              >
                <div className="flex items-center justify-between">
                  <div className="h-4 bg-slate-200 rounded-md w-1/2"></div>
                  <div className="h-5 bg-emerald-100 rounded-full w-16"></div>
                </div>
                <div className="h-3 bg-slate-200 rounded-md w-3/4"></div>
                <div className="h-8 bg-slate-100 rounded-xl w-full"></div>
              </div>
            ))}
          </div>
        )}

        {/* Empty state: No mosques found */}
        {!isLoadingMosques && filteredMosques.length === 0 && (
          <div className="bg-white rounded-3xl border border-slate-200 p-8 text-center space-y-3 shadow-xs">
            <div className="w-12 h-12 mx-auto rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold">
              <MapPin className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-800">
              {isUrdu ? 'اس دائرے میں کوئی مسجد نہیں ملی' : 'No Mosques Found In This Radius'}
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto">
              {isUrdu
                ? `منتخب کردہ ${radiusKm} کلومیٹر کے دائرے میں اوپن اسٹریٹ میپ پر کوئی مسجد درج نہیں ہے۔ تلاش کا دائرہ ۱۰ یا ۲۵ کلومیٹر کر کے دوبارہ دیکھیں۔`
                : `No tagged mosques found within ${radiusKm} km on OpenStreetMap. Try expanding the search radius to 10 km or 25 km, or search a nearby city.`}
            </p>
            <div className="pt-2 flex items-center justify-center gap-2">
              <button
                type="button"
                onClick={() => setRadiusKm(10)}
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition-colors cursor-pointer"
              >
                {isUrdu ? 'دائرہ ۱۰ کلومیٹر کریں' : 'Expand to 10 km'}
              </button>
              <button
                type="button"
                onClick={() => setRadiusKm(25)}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition-colors cursor-pointer"
              >
                {isUrdu ? 'دائرہ ۲۵ کلومیٹر کریں' : 'Expand to 25 km'}
              </button>
            </div>
          </div>
        )}

        {/* Mosques Grid */}
        {!isLoadingMosques && filteredMosques.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
            {filteredMosques.map((mosque) => {
              const isSelected = mosque.id === selectedMosqueId;
              const { walk, drive } = estimateTravelTimes(mosque.distance, isUrdu);
              const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${mosque.lat},${mosque.lon}`;

              return (
                <article
                  key={mosque.id}
                  className={`bg-white rounded-2xl border p-4 sm:p-5 shadow-xs transition-all flex flex-col justify-between gap-3 ${
                    isSelected
                      ? 'border-emerald-600 ring-2 ring-emerald-500/20 bg-emerald-50/20'
                      : 'border-slate-200 hover:border-emerald-300'
                  }`}
                >
                  <div className="space-y-2">
                    {/* Top Row: Mosque Name & Distance Badge */}
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-start gap-2.5">
                        <div
                          className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 text-base ${
                            isSelected ? 'bg-amber-500 text-white' : 'bg-emerald-100 text-emerald-800'
                          }`}
                        >
                          🕌
                        </div>
                        <div>
                          <h3 className="text-sm sm:text-base font-bold text-slate-900 leading-snug">
                            {mosque.name}
                          </h3>
                          {mosque.nameUrdu && mosque.nameUrdu !== mosque.name && (
                            <p className="text-xs text-slate-500 font-serif mt-0.5">{mosque.nameUrdu}</p>
                          )}
                        </div>
                      </div>

                      <div className="shrink-0 text-right">
                        <span className="inline-block px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-900 text-xs font-black shadow-2xs">
                          {formatDistance(mosque.distance, isUrdu)}
                        </span>
                      </div>
                    </div>

                    {/* Travel time estimates */}
                    <div className="flex items-center gap-3 text-[11px] text-slate-500 pt-1">
                      <span className="flex items-center gap-1">
                        🚶 {walk}
                      </span>
                      <span className="flex items-center gap-1">
                        🚗 {drive}
                      </span>
                      {mosque.jummah && (
                        <span className="bg-amber-100 text-amber-900 font-bold px-2 py-0.5 rounded-full text-[10px]">
                          {isUrdu ? 'نمازِ جمعہ' : "Jumu'ah"}
                        </span>
                      )}
                    </div>

                    {/* Address if available */}
                    {mosque.address && (
                      <div className="text-xs text-slate-600 flex items-start gap-1.5 pt-0.5">
                        <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
                        <span className="line-clamp-2">{mosque.address}</span>
                      </div>
                    )}

                    {/* Feature tags (Wudu, Women, Wheelchair) */}
                    <div className="flex flex-wrap items-center gap-1.5 pt-1 text-[11px]">
                      {mosque.wuduFacilities && (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-teal-50 text-teal-800 border border-teal-200">
                          💧 {isUrdu ? 'وضو خانہ' : 'Wudu Facility'}
                        </span>
                      )}
                      {mosque.femaleFacilities && (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-purple-50 text-purple-800 border border-purple-200">
                          🧕 {isUrdu ? 'خواتین کی جگہ' : "Women's Area"}
                        </span>
                      )}
                      {mosque.wheelchair && mosque.wheelchair === 'yes' && (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-blue-50 text-blue-800 border border-blue-200">
                          ♿ {isUrdu ? 'وہیل چیئر کی سہولت' : 'Wheelchair Accessible'}
                        </span>
                      )}
                      {mosque.denomination && (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-slate-100 text-slate-700">
                          {mosque.denomination}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Actions Row */}
                  <div className="flex items-center justify-between gap-2 pt-2 border-t border-slate-100">
                    <button
                      type="button"
                      onClick={() => handleFocusMosque(mosque)}
                      className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold flex items-center gap-1 transition-colors cursor-pointer"
                    >
                      <MapPin className="w-3.5 h-3.5 text-emerald-600" />
                      <span>{isUrdu ? 'نقشے پر دیکھیں' : 'View on Map'}</span>
                    </button>

                    <div className="flex items-center gap-1.5">
                      <button
                        type="button"
                        onClick={() => handleCopyCoords(mosque)}
                        title={isUrdu ? 'کوآرڈینیٹس کاپی کریں' : 'Copy GPS Coordinates'}
                        className="p-1.5 rounded-xl hover:bg-slate-100 text-slate-500 hover:text-slate-800 transition-colors cursor-pointer"
                      >
                        {copiedId === mosque.id ? (
                          <Check className="w-4 h-4 text-emerald-600" />
                        ) : (
                          <Share2 className="w-4 h-4" />
                        )}
                      </button>

                      <a
                        href={directionsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center gap-1.5 shadow-xs transition-colors cursor-pointer"
                      >
                        <Navigation className="w-3.5 h-3.5" />
                        <span>{isUrdu ? 'راستہ معلوم کریں' : 'Get Directions'}</span>
                        <ExternalLink className="w-3 h-3 opacity-80" />
                      </a>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </section>

      {/* Islamic Etiquette & OpenStreetMap Transparency Notice */}
      <section className="bg-slate-50 rounded-3xl border border-slate-200 p-5 sm:p-6 space-y-4">
        <div className="flex items-center gap-2 text-emerald-800 font-bold text-sm sm:text-base">
          <Sparkles className="w-4 h-4 text-emerald-600" />
          <h3>{isUrdu ? 'مسجد میں حاضری کے مسنون آداب' : 'Sunnah Etiquette of the Masjid'}</h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-slate-600">
          <div className="bg-white p-3.5 rounded-2xl border border-slate-200/70 space-y-1">
            <div className="font-bold text-slate-800">
              {isUrdu ? '۱. مسجد میں داخلے کی دعا' : '1. Entering with Right Foot'}
            </div>
            <p className="leading-relaxed">
              {isUrdu
                ? 'دایاں پاؤں پہلے رکھیں اور پڑھیں: "اللَّهُمَّ افْتَحْ لِي أَبْوَابَ رَحْمَتِكَ"'
                : 'Enter with right foot and recite: "O Allah, open for me the doors of Your mercy."'}
            </p>
          </div>

          <div className="bg-white p-3.5 rounded-2xl border border-slate-200/70 space-y-1">
            <div className="font-bold text-slate-800">
              {isUrdu ? '۲. تحیۃ المسجد' : '2. Tahiyyat al-Masjid'}
            </div>
            <p className="leading-relaxed">
              {isUrdu
                ? 'بیٹھنے سے پہلے ۲ رکعت نفل ادا کرنا مسنون ہے (مکروہ اوقات کے علاوہ)۔'
                : 'It is Sunnah to perform 2 units of prayer upon entering before sitting down.'}
            </p>
          </div>

          <div className="bg-white p-3.5 rounded-2xl border border-slate-200/70 space-y-1">
            <div className="font-bold text-slate-800">
              {isUrdu ? '۳. وقار اور سکون' : '3. Calmness & Demeanor'}
            </div>
            <p className="leading-relaxed">
              {isUrdu
                ? 'مسجد میں وقار، سکون اور دھیمی آواز کا اہتمام فرمائیں۔'
                : 'Walk with composure and tranquility. Avoid running even if the prayer has begun.'}
            </p>
          </div>
        </div>

        {/* Disclaimer & Attribution */}
        <div className="pt-3 border-t border-slate-200/80 text-[11px] text-slate-500 leading-relaxed space-y-1">
          <p>
            <span className="font-semibold text-slate-700">
              {isUrdu ? 'اوپن ڈیٹا کی وضاحت: ' : 'Open Data Notice: '}
            </span>
            {isUrdu
              ? 'مساجد کی معلومات اوپن اسٹریٹ میپ (OpenStreetMap) کے رضاکاروں کی طرف سے فراہم کردہ اوپن ڈیٹا پر مبنی ہیں۔ ممکن ہے نئی مساجد یا عارضی مصلے ابھی تک میپ پر درج نہ ہوں۔ نماز اور باجماعت اوقات کی تصدیق مقامی مسجد انتظامیہ سے کی جا سکتی ہے۔'
              : 'Mosque coordinates and names are provided by OpenStreetMap contributors via the public Overpass API. Completeness depends on local community mapping. For exact prayer and Jama\'at timings, please check directly with the local mosque administration.'}
          </p>
          <p>
            <span className="font-semibold text-slate-700">
              {isUrdu ? 'پرائیویسی کا وعدہ: ' : 'Privacy Guarantee: '}
            </span>
            {isUrdu
              ? 'آپ کی جی پی ایس لوکیشن مکمل طور پر آپ کے اپنے موبائل یا براؤزر میں رہتی ہے اور کسی ڈیٹا بیس میں محفوظ نہیں کی جاتی۔'
              : 'Your GPS location is processed purely on-device within your browser and is never uploaded to any backend database.'}
          </p>
        </div>
      </section>
    </div>
  );
};

export default NearbyMosques;
