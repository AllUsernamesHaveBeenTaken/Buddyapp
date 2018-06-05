defmodule Buddy.Repo.Migrations.CreateGigs do
  use Ecto.Migration

  def change do
    create table(:gigs) do
      add :title, :string
      add :location, :string
      add :when, :naive_datetime
      add :favorite_count, :integer, default: 0, null: false
      add :is_favorited, :boolean, default: false, null: false

      timestamps()
    end

  end
end
