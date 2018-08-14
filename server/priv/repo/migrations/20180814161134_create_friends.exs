defmodule Buddy.Repo.Migrations.CreateFriends do
  use Ecto.Migration

  def change do
    create table(:friends) do
      add :user_id, references(:users, on_delete: :nothing), null: false
      add :friend_id, references(:users, on_delete: :nothing), null: false

      timestamps()
    end

    create unique_index(:friends, [:user_id, :friend_id], name: :user_has_friend )
  end
end
