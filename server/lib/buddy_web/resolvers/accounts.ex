defmodule BuddyWeb.Resolvers.Accounts do
  def login(_, %{token: token, provider: provider}, _) do
    case provider do
      :facebook ->
        {:ok, user} = BuddyWeb.Authentication.login(token, "facebook")
        {:ok, token, _} = BuddyWeb.Auth.Guardian.encode_and_sign(user)
        {:ok, %{token: token}}
    end
  end
end