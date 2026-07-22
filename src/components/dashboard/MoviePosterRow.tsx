import { MoviePosterCard } from "~/components/dashboard/MoviePosterCard";
import { MovieAverageWatchTimeCard } from "~/components/dashboard/MovieAverageWatchTimeCard";
import { MovieDeviceDistributionChart } from "~/components/dashboard/MovieDeviceDistributionChart";
import { MovieRetentionChart } from "~/components/dashboard/MovieRetentionChart";
import { useMovieDetails } from "~/features/movie-details/movie-details.hooks";
import { getMovieDashboardData } from "~/features/dashboard/dashboard.service";

type MoviePosterRowProps = {
  tmdbMovieId: number;
};

export function MoviePosterRow({ tmdbMovieId }: MoviePosterRowProps) {
  const { data: movieDetails } = useMovieDetails(tmdbMovieId);
  const dashboardData = getMovieDashboardData(tmdbMovieId);

  if (!movieDetails || !dashboardData) {
    return null;
  }

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 0.55fr 1.85fr",
        gridTemplateRows: "auto 1fr",
        gap: "var(--mantine-spacing-md)",
      }}
    >
      <div style={{ gridColumn: 1, gridRow: 1 }}>
        <MoviePosterCard
          title={movieDetails.title}
          backdropPath={movieDetails.backdrop_path}
          releaseDate={movieDetails.release_date}
          voteAverage={movieDetails.vote_average}
          runtime={movieDetails.runtime}
        />
      </div>

      <div style={{ gridColumn: 1, gridRow: 2 }}>
        <MovieAverageWatchTimeCard tmdbMovieId={tmdbMovieId} stats={dashboardData.stats} />
      </div>

      <div style={{ gridColumn: 2, gridRow: "1 / 3" }}>
        <MovieDeviceDistributionChart tmdbMovieId={tmdbMovieId} />
      </div>

      <div style={{ gridColumn: 3, gridRow: "1 / 3", minWidth: 0 }}>
        <MovieRetentionChart retentionCurve={dashboardData.retentionCurve} />
      </div>
    </div>
  );
}
