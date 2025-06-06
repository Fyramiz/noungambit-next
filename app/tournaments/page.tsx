"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

// Define event structure
interface Event {
  id: string;
  location: string;
  time: string;
  location_at_map: string;
  incomming: boolean;
  players_played: number | null;
}

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL ?? "",
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? ""
);

export default function LeaderboardPage() {
  const [incomingEvents, setIncomingEvents] = useState<Event[]>([]);
  const [pastEvents, setPastEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      const { data, error } = await supabase
        .from("events")
        .select("id, location, time, location_at_map, incomming, players_played")
        .order("time", { ascending: true });

      if (error) {
        console.error("Error fetching events:", error);
      } else {
        const upcoming = data?.filter(e => e.incomming) || [];
        const past = data?.filter(e => !e.incomming) || [];
        setIncomingEvents(upcoming);
        setPastEvents(past);
      }

      setLoading(false);
    };

    fetchEvents();
  }, []);

  const formatTime = (time: string) =>
    new Date(time).toLocaleString("en-GB", {
      weekday: "long",
      hour: "2-digit",
      minute: "2-digit",
      day: "numeric",
      month: "short",
      timeZone: "Africa/Casablanca"
    });

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-green-50 py-8">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-amber-900 mb-2">Tournaments</h1>
          <p className="text-gray-600 mt-2">Meet and Play with People in tournaments</p>
        </div>

        <Card className="border-amber-200 mb-6">
          <CardHeader>
            <CardTitle className="text-amber-900">📅 Incoming Events</CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <p className="text-gray-600">Loading events...</p>
            ) : incomingEvents.length === 0 ? (
              <p className="text-gray-600">No upcoming tournaments found.</p>
            ) : (
              <div className="space-y-4">
                {incomingEvents.map(event => (
                  <div
                    key={event.id}
                    className="flex items-center justify-between p-4 bg-white rounded-lg border hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 flex justify-center"></div>
                      <div>
                        <h3 className="font-semibold text-gray-900">{event.location}</h3>
                        <p className="text-sm text-gray-600">
                          {formatTime(event.time)} GMT+1
                          <Button size="sm" className="ml-4 bg-amber-600 hover:bg-amber-700">
                            <Link href={event.location_at_map} target="_blank" className="flex items-center gap-1">
                              View On Map
                            </Link>
                          </Button>
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="border-amber-200">
          <CardHeader>
            <CardTitle className="text-amber-900">🕘 Past Events</CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <p className="text-gray-600">Loading past events...</p>
            ) : pastEvents.length === 0 ? (
              <p className="text-gray-600">No past tournaments recorded yet.</p>
            ) : (
              <div className="space-y-4">
                {pastEvents.map(event => (
                  <div
                    key={event.id}
                    className="flex items-center justify-between p-4 bg-white rounded-lg border hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 flex justify-center"></div>
                      <div>
                        <h3 className="font-semibold text-gray-900">{event.location}</h3>
                        <p className="text-sm text-gray-600">
                          {formatTime(event.time)} GMT+1
                          <span className="ml-4 text-green-600 font-semibold">
                            {event.players_played ?? 0} players attended
                          </span>
                          <Button size="sm" className="ml-4 bg-amber-600 hover:bg-amber-700">
                            <Link href={event.location_at_map} target="_blank" className="flex items-center gap-1">
                              View On Map
                            </Link>
                          </Button>
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
