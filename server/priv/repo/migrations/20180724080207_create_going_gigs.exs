defmodule Buddy.Repo.Migrations.CreateGoingGigs do
  use Ecto.Migration

  def change do
    create table(:going_gigs) do
      add :user_id, references(:users, on_delete: :nothing), null: false
      add :gig_id, references(:gigs, on_delete: :nothing), null: false

      timestamps()
    end

      create unique_index(:going_gigs, [:user_id, :gig_id], name: :user_going_gig)
  end
end
