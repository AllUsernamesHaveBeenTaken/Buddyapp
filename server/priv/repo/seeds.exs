import Integer, only: [is_odd: 1]

alias Buddy.{Posts, Repo, Accounts}

mock_gigs = 9
mock_users = 5

# Users
for idx <- 1..mock_users do
    sex = if (is_odd(idx)), do: "men", else: "women"
    avatar = "https://randomuser.me/api/portraits#{sex}/#{idx}.jpg"
    %Accounts.User{
        email: Faker.Internet.email,
        avatar: avatar,
        first_name: Faker.Name.first_name,
        last_name: Faker.Name.last_name,
        facebook_id: "facebook_#{idx}"
    }

    |> Repo.insert!
end

# Gigs
for idx <- 0..mock_gigs do
    gig = %{
        title: Faker.Pizza.pizza,
        location: Faker.StarWars.planet,
        when: Faker.DateTime.forward(10),
        user_id: Enum.random(1..mock_users)
    }

    %Posts.Gig{}
    |> Posts.Gig.changeset(gig)
    |> Repo.insert!
end