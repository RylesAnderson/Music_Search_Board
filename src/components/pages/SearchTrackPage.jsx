import { useState, useEffect } from "react"
import {
  FormControl,
  InputGroup,
  Container,
  Button,
  Card,
  Row,
} from "react-bootstrap";

const clientId = import.meta.env.VITE_CLIENT_ID;
const clientSecret = import.meta.env.VITE_CLIENT_SECRET;

export const SearchTrackPage = () => {
    const [searchInput, setSearchInput] = useState("");
    const [accessToken, setAccessToken] = useState("");
    const [tracks, setTrack] = useState([]);

    useEffect(() => {
      let authParams = {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body:
            "grant_type=client_credentials&client_id=" +
            clientId +
            "&client_secret=" +
            clientSecret,
      };

      fetch("https://accounts.spotify.com/api/token", authParams)
      .then((result) => result.json())
      .then((data) => {
        setAccessToken(data.access_token);
      });
    }, []);

      async function search() {
        let artistParams = {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + accessToken,
          },
        };

        const artistID = await fetch(
          "https://api.spotify.com/v1/search?q=" + searchInput + "&type=artist",
          artistParams
        )
          .then((result) => result.json())
          .then((data) => {
            return data.artists.items[0].id;
          });

          console.log(artistID);

        await fetch(
          "https://api.spotify.com/v1/artists/" +
            artistID + "/top-tracks?market=US", artistParams
        )
          .then((result) => result.json())
          .then((data) => {
            setTrack(data.tracks);
          });
      }

  return (
    <>
    <br></br>
    <br></br>
    <br></br>
    <br></br>
    <h1>Artists Top Tracks</h1>
      <Container>
        <InputGroup>
          <FormControl
            placeholder="Search For Artist"
            type="input"
            aria-label="Search for an Artist"
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                search();
              }
            }}
            onChange={(event) => setSearchInput(event.target.value)}
            style={{
              width: "300px",
              height: "35px",
              borderWidth: "0px",
              borderStyle: "solid",
              borderRadius: "5px",
              marginRight: "10px",
              paddingLeft: "10px",
            }}
          />
          <Button onClick={search}>Search</Button>
        </InputGroup>
      </Container>

      <Container>
        <Row
          style={{
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "space-around",
            alignContent: "center",
          }}
        >
          {tracks.map((tracks) => {
            return (
              <Card
                key={tracks.id}
                style={{
                  backgroundColor: "#678391",
                  margin: "10px",
                  borderRadius: "5px",
                  marginBottom: "30px",
                }}
              >
                <Card.Img
                  width={200}
                  src={tracks.album.images[0].url}
                  style={{
                    borderRadius: "4%",
                  }}
                />
                <Card.Body>
                  <Card.Title
                    style={{
                      whiteSpace: "wrap",
                      fontWeight: "bold",
                      maxWidth: "200px",
                      fontSize: "18px",
                      marginTop: "10px",
                      color: "black",
                    }}
                  >
                    {tracks.name}
                  </Card.Title>
                  <Card.Text
                    style={{
                      color: "black",
                    }}
                  >
                    Release Date: <br /> {tracks.album.release_date}
                  </Card.Text>
                  <Button
                    href={tracks.external_urls.spotify}
                    style={{
                      backgroundColor: "black",
                      color: "white",
                      fontWeight: "bold",
                      fontSize: "15px",
                      borderRadius: "5px",
                      padding: "10px",
                    }}
                  >
                    Track Link
                  </Button>
                </Card.Body>
              </Card>
            );
          })}
        </Row>
      </Container>
    </>
  );
};
