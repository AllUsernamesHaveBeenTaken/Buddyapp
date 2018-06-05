defmodule Buddy.Repo.Migrations.CreateLikeGigs do
  use Ecto.Migration

  def change do
    create table(:like_gigs) do
      add :user_id, references(:users, on_delete: :nothing), null: false
      add :gig_id, references(:gigs, on_delete: :nothing), null: false

      timestamps()
    end

    create unique_index(:like_gigs, [:user_id, :gig_id], name: :user_likes_gig)
  end
end
