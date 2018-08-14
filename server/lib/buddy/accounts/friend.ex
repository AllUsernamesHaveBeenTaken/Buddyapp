defmodule Buddy.Accounts.Friend do
  use Ecto.Schema
  import Ecto.Changeset


  schema "friends" do
    field :user_id, :id
    field :friend_id, :id

    timestamps()
  end

  @doc false
  def changeset(friend, attrs) do
    friend
    |> cast(attrs, [:user_id, :friend_id])
    |> validate_required([:user_id, :friend_id])
  end
end
