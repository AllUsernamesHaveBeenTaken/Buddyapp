defmodule BuddyWeb.Authentication do
  def login(token, "facebook") do
    attrs = BuddyWeb.Oauth.Facebook.get_info(token)
    search_params = %{facebook_id: attrs.facebook_id}
    Buddy.Accounts.get_user_or_create(attrs, search_params)
  end
end