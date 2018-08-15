defmodule BuddyWeb.Resolvers.Accounts do
  def login(_, %{token: token, provider: provider}, _) do
    case provider do
      :facebook ->
        {:ok, user} = BuddyWeb.Authentication.login(token, "facebook")
        {:ok, token, _} = BuddyWeb.Auth.Guardian.encode_and_sign(user)
        {:ok, %{token: token}}
    end
  end

  def befriend(_, %{friend_id: friend_id}, %{context: %{current_user: current_user}}) do
    with {:ok, message} <- Buddy.Accounts.befriend(friend_id, current_user.id) do
      {:ok, message}
    end
  end

  def get_friends(_, _, %{context: %{current_user: current_user}}) do
    {:ok, Buddy.Accounts.get_friends(current_user.id)}
  end
end