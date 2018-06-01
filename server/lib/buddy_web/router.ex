defmodule BuddyWeb.Router do
  use BuddyWeb, :router

  pipeline :api do
    plug :accepts, ["json"]
    plug BuddyWeb.Context
  end

  scope "/api" do
    pipe_through :api

    forward "/graphql", Absinthe.Plug,
      schema: BuddyWeb.Schema
    
      if Mix.env == :dev do
        forward "/graphiql", Absinthe.Plug.GraphiQL,
          schema: BuddyWeb.Schema
      end
  end
end
