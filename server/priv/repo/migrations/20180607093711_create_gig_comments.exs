defmodule Buddy.Repo.Migrations.CreateGigComments do
  use Ecto.Migration

  def change do
    create table(:gig_comments) do
      add :text, :text
      add :user_id, references(:users, on_delete: :delete_all), null: false
      add :gig_id, references(:gigs, on_delete: :delete_all), null: false

      timestamps()
    end

    create index(:gig_comments, [:user_id])
    create index(:gig_comments, [:gig_id])
  end
end
