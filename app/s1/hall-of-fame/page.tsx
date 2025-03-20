"use client";
import React, { useEffect, useState } from "react";
import S1BaseLayout from "../s1-base-layout";
import DottedSeparator from "@/components/dotted-separator";
import S1FinisherCard from "@/components/s1-finisher-card";
import LoadingSpinner from "@/components/ui/loading-spinner";
import { apiClient } from "@/lib/api-client";
import { Finisher } from "@/types";
import { Alert, AlertDescription } from "@/components/ui/alert";

const Page: React.FC = () => {
  const [finishers, setFinishers] = useState<Finisher[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFinishers = async () => {
      try {
        setError(null);
        const data = await apiClient.getFinishers();
        setFinishers(data);
      } catch (error) {
        console.error("Error fetching finishers:", error);
        setError(error instanceof Error ? error.message : "Failed to load finishers");
      } finally {
        setLoading(false);
      }
    };

    fetchFinishers();
  }, []);

  if (loading) {
    return (
      <S1BaseLayout>
        <LoadingSpinner size="55vh" />
      </S1BaseLayout>
    );
  }

  if (error) {
    return (
      <S1BaseLayout>
        <div className="max-w-md mx-auto mt-8">
          <Alert variant="destructive">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        </div>
      </S1BaseLayout>
    );
  }

  return (
    <S1BaseLayout>
      <div className="text-center my-8">
        <h2 className="text-5xl font-extrabold">hall of fame</h2>
      </div>

      <div className="grid justify-center grid-cols-1 justify-items-center md:grid-cols-2 gap-8 md:gap-10 md:max-w-[640px] mx-auto mb-8">
        {finishers.map((person) => (
          <S1FinisherCard
            key={person.username}
            name={person.name}
            vibe={person.vibe}
            username={person.username}
          />
        ))}
      </div>

      <DottedSeparator />
    </S1BaseLayout>
  );
};

export default Page;
