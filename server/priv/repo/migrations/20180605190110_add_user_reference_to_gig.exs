defmodule Buddy.Repo.Migrations.AddUserReferenceToGig do
  use Ecto.Migration

  def change do
    alter table("gigs") do
      add :user_id, references(:users, on_delete: :delete_all), null: false
    end
  end
end
