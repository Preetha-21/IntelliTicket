export interface MuseumEvent {
  id: string;
  name: string;
  description: string;
  date: string;
  time: string;
  image: string;
  price: number;
}

const STORAGE_KEY = "museum_events";

const DEFAULT_EVENTS: MuseumEvent[] = [
  {
    id: "default-1",
    name: "Ancient Egypt Exhibition",
    description: "Journey through 3,000 years of Egyptian civilization. Explore mummies, hieroglyphics, and treasures from the pharaohs' tombs.",
    date: "2026-03-15",
    time: "10:00 AM – 12:00 PM",
    image: "https://images.unsplash.com/photo-1553913861-c0fddf2619ee?w=600&h=400&fit=crop",
    price: 15,
  },
  {
    id: "default-2",
    name: "Dinosaur Discovery",
    description: "Walk among life-size dinosaur skeletons and interactive displays. Perfect for families and young explorers.",
    date: "2026-03-16",
    time: "11:00 AM – 1:00 PM",
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=600&h=400&fit=crop",
    price: 12,
  },
  {
    id: "default-3",
    name: "Space & Cosmos",
    description: "Experience the wonders of the universe with immersive planetarium shows, real meteorites, and NASA artifacts.",
    date: "2026-03-17",
    time: "1:00 PM – 3:00 PM",
    image: "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=600&h=400&fit=crop",
    price: 18,
  },
  {
    id: "default-4",
    name: "Renaissance Art Gallery",
    description: "Admire masterpieces from Da Vinci, Michelangelo, and Raphael in a beautifully curated gallery setting.",
    date: "2026-03-18",
    time: "2:00 PM – 4:00 PM",
    image: "https://images.unsplash.com/photo-1544967082-d9d25d867d66?w=600&h=400&fit=crop",
    price: 15,
  },
  {
    id: "default-5",
    name: "Ocean Life Experience",
    description: "Dive into the deep blue with stunning marine displays, coral reef models, and interactive touch pools.",
    date: "2026-03-19",
    time: "3:00 PM – 5:00 PM",
    image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=600&h=400&fit=crop",
    price: 10,
  },
  {
    id: "default-6",
    name: "World War History",
    description: "A powerful exhibit featuring wartime artifacts, personal stories, and immersive recreations of key moments.",
    date: "2026-03-20",
    time: "4:00 PM – 6:00 PM",
    image: "https://images.unsplash.com/photo-1580477667995-2b94f01c9516?w=600&h=400&fit=crop",
    price: 15,
  },
];

export function getEvents(): MuseumEvent[] {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_EVENTS));
    return DEFAULT_EVENTS;
  }
  return JSON.parse(stored);
}

export function saveEvents(events: MuseumEvent[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(events));
}

export function addEvent(event: Omit<MuseumEvent, "id">): MuseumEvent {
  const events = getEvents();
  const newEvent: MuseumEvent = { ...event, id: `evt-${Date.now()}` };
  events.push(newEvent);
  saveEvents(events);
  return newEvent;
}

export function updateEvent(id: string, updates: Partial<MuseumEvent>) {
  const events = getEvents().map((e) => (e.id === id ? { ...e, ...updates } : e));
  saveEvents(events);
}

export function deleteEvent(id: string) {
  saveEvents(getEvents().filter((e) => e.id !== id));
}
