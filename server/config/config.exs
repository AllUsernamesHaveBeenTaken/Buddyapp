# This file is responsible for configuring your application
# and its dependencies with the aid of the Mix.Config module.
#
# This configuration file is loaded before any dependency and
# is restricted to this project.
use Mix.Config

# General application configuration
config :buddy,
  ecto_repos: [Buddy.Repo]

# Configures the endpoint
config :buddy, BuddyWeb.Endpoint,
  url: [host: "localhost"],
  secret_key_base: "+vtVua42B9gw8T1dwE6ishWFH6R5Uybc/UZuUewOt7/s9HAf0ijH4qdpOKnb+Eer",
  render_errors: [view: BuddyWeb.ErrorView, accepts: ~w(json)],
  pubsub: [name: Buddy.PubSub,
           adapter: Phoenix.PubSub.PG2]

# Configures Elixir's Logger
config :logger, :console,
  format: "$time $metadata[$level] $message\n",
  metadata: [:user_id]

# Configures Guardian
config :buddy, BuddyWeb.Auth.Guardian,
  issuer: "buddy",
  verify_user: true,
  secret_key: "SgcCvRBEjohbmU61RNoP8Dewa7yn/Byntlo3zWLh4qWBXTZeDPfHb3+CwxYJQ3WE"

# Import environment specific config. This must remain at the bottom
# of this file so it overrides the configuration defined above.
import_config "#{Mix.env}.exs"
