defmodule Buddy.Repo.Migrations.CreateGigs do
  use Ecto.Migration

  def change do
    create table(:gigs) do
      add :title, :string
      add :location, :string
      add :when, :naive_datetime
      add :favoriteCount, :integer
      add :isFavorited, :boolean, default: false, null: false

      timestamps()
    end

  end
end
