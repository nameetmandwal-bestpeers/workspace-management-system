"use client";

import {
  ArrowLeft,
  CalendarDays,
  Copy,
  Hash,
  UserRound,
  Users,
} from "lucide-react";
import { useParams, useRouter } from "next/navigation";

import UserList from "../../users/components/UserList";
import { useTeam } from "../hook/useTeams";
// import { useFetchTeamById } from "@/hooks/team/useFetchTeamById";



export default function TeamDetails() {
  const router = useRouter();
  const {id:teamId} = useParams()

  const {
    data: team,
    isLoading,
    isError,
  } = useTeam(teamId);

  const handleCopyId = async () => {
    if (!team?._id) return;

    await navigator.clipboard.writeText(team._id);
  };


  console.log("team",team)

  if (isLoading) {
    return (
      <main className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
        <div className="flex min-h-[400px] items-center justify-center">
          <div className="flex flex-col items-center gap-3">
            <div className="h-9 w-9 animate-spin rounded-full border-4 border-gray-200 border-t-orange-500" />

            <p className="text-sm text-gray-500">
              Loading team...
            </p>
          </div>
        </div>
      </main>
    );
  }

  if (isError || !team) {
    return (
      <main className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
        <div className="mx-auto max-w-7xl">
          <div className="rounded-xl border border-red-200 bg-white p-8 text-center">
            <p className="font-medium text-red-600">
              Unable to load team
            </p>

            <p className="mt-1 text-sm text-gray-500">
              The team may not exist or could not be loaded.
            </p>

            <button
              type="button"
              onClick={() => router.back()}
              className="mt-5 inline-flex items-center gap-2 rounded-lg bg-orange-500 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-orange-600"
            >
              <ArrowLeft size={17} />
              Go Back
            </button>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-7xl space-y-6">
        {/* Back Button */}
        <button
          type="button"
          onClick={() => router.back()}
          className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 transition hover:text-orange-500"
        >
          <ArrowLeft size={17} />
          Back to Teams
        </button>

        {/* Team Header */}
        <section className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
          {/* Orange Header Accent */}
          <div className="h-1.5 bg-orange-500" />

          <div className="p-5 sm:p-6">
            {/* Team Title */}
            <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
              <div className="flex items-start gap-4">
                {/* Team Icon */}
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-orange-100 text-xl font-bold text-orange-600">
                  {team.name?.charAt(0)?.toUpperCase()}
                </div>

                <div>
                  <h1 className="text-2xl font-semibold tracking-tight text-gray-900">
                    {team.name}
                  </h1>

                  <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">
                    {team.description || "No description provided."}
                  </p>
                </div>
              </div>
            </div>

            {/* Team Information */}
            <div className="mt-6 grid gap-4 border-t border-gray-100 pt-6 sm:grid-cols-2 lg:grid-cols-4">
              {/* Team ID */}
              <div className="rounded-lg border border-gray-100 bg-gray-50 p-4">
                <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-wide text-gray-400">
                  <Hash size={15} />
                  Team ID
                </div>

                <div className="mt-2 flex items-center gap-2">
                  <p
                    title={team._id}
                    className="truncate font-mono text-sm text-gray-700"
                  >
                    {team._id}
                  </p>

                  <button
                    type="button"
                    onClick={handleCopyId}
                    title="Copy team ID"
                    className="shrink-0 rounded-md p-1.5 text-gray-400 transition hover:bg-orange-100 hover:text-orange-500"
                  >
                    <Copy size={14} />
                  </button>
                </div>
              </div>

              {/* Owner */}
              <div className="rounded-lg border border-gray-100 bg-gray-50 p-4">
                <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-wide text-gray-400">
                  <UserRound size={15} />
                  Owner
                </div>

                <p className="mt-2 font-medium text-gray-800">
                  {team.owner?.name || "Unknown"}
                </p>

                {team.owner?.email && (
                  <p className="mt-0.5 truncate text-xs text-gray-400">
                    {team.owner.email}
                  </p>
                )}
              </div>

              {/* Members */}
              <div className="rounded-lg border border-gray-100 bg-gray-50 p-4">
                <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-wide text-gray-400">
                  <Users size={15} />
                  Members
                </div>

                <p className="mt-2 text-xl font-semibold text-gray-900">
                  {team.members?.length || 0}
                </p>

                <p className="text-xs text-gray-400">
                  {team.members?.length === 1
                    ? "team member"
                    : "team members"}
                </p>
              </div>

              {/* Created At */}
              <div className="rounded-lg border border-gray-100 bg-gray-50 p-4">
                <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-wide text-gray-400">
                  <CalendarDays size={15} />
                  Created
                </div>

                <p className="mt-2 font-medium text-gray-800">
                  {new Date(team.createdAt).toLocaleDateString(
                    "en-IN",
                    {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    },
                  )}
                </p>

                <p className="mt-0.5 text-xs text-gray-400">
                  {new Date(team.createdAt).toLocaleTimeString(
                    "en-IN",
                    {
                      hour: "2-digit",
                      minute: "2-digit",
                    },
                  )}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Team Users */}
        <section>
          <UserList />
        </section>
      </div>
    </main>
  );
}
