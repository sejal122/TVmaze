import React, { useEffect, useState } from "react";
import axios, * as others from "https://cdn.skypack.dev/axios@0.21.1";
import ReactHtmlParser from "html-react-parser";
import { useParams } from "react-router-dom";
import Rating from "@mui/material/Rating";
import StarIcon from "@mui/icons-material/Star";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import "./selectedshow.css";
export default function Selectedshow() {
  const [show, setShow] = useState([]);
  const [img, setImg] = useState();
  const [cast, setCast] = useState([]);
  const [days, setDays] = useState([]);
  const [time, setTime] = useState("");
  const [prevEpisode, setPrevEpisode] = useState("");
  const [officialsite, setOfficialsite] = useState("");
  const [network, setNetwork] = useState("");
  const [rating, setRating] = useState("");
  const params = useParams();
  const getData = () => {
    axios.get(`https://api.tvmaze.com/shows/${params.id}`).then((response) => {
      console.clear();
      setShow(response.data);
      setDays(response.data.schedule["days"]);
      setTime(response.data.schedule["time"]);
      setOfficialsite(response.data["officialSite"]);
      setPrevEpisode(response.data._links.previousepisode["href"]);
      setRating(response.data["rating"]["average"]);
      setNetwork(response.data["network"]["name"]);
    });
  };
  const getImg = () => {
    axios
      .get(`https://api.tvmaze.com/shows/${params.id}/images`)
      .then((response) => {
        let img = response.data;
        setImg(img[0]["resolutions"]["original"]["url"]);
      });
  };
  const getCast = () => {
    axios
      .get(`https://api.tvmaze.com/shows/${params.id}/cast`)
      .then((response) => {
        setCast(response.data);
      });
  };
  useEffect(() => {
    getData();
    getImg();
    getCast();
  }, []);

  return (
    <div className="box">
      <div className="row">
        <div className="col-sm-10 col-mg-12">
          <img
            className="img-fluid img"
            src={
              (img != null) | " " | "null"
                ? img
                : "https://www.seickel.com/steam-systems/wp-content/uploads/2021/01/no_image_available_28.jpg"
            }
          ></img>
          <div className="cast">
            {cast.length <= 0 ? (
              <h6>Sorry, cast/crew information unavailable</h6>
            ) : (
              cast.map((person) => {
                let str = person.person.name + " , ";
                return <i key={str}>{str}</i>;
              })
            )}
          </div>
        </div>
        <div className="col-sm-5 col-12 col-md-12">
          <h1>{show.name}</h1>
          <div className="details">Type: {show.type} </div>
          <div className="details">Language: {show.language}</div>
          <div className="details">Network: {network}</div>
          <div id="Genere">
            <div id="label">Genere </div>
            <div className="genereList">
              {show.genres?.map((item) => {
                let bgColor = "#F0E68C";
                {
                  switch (item) {
                    case "Drama":
                      bgColor = "#c50000";
                      break;
                    case "Thriller":
                      bgColor = "#5859a7";
                      break;
                    case "Mystery":
                      bgColor = "#4c3a6e";
                      break;
                    case "Crime":
                      bgColor = "#e2b9b3";
                      break;
                    case "Romance":
                      bgColor = "#db5d18";
                      break;
                    case "Horror":
                      bgColor = "#839973";
                      break;
                    case "Comedy":
                      bgColor = "#ffce00";
                      break;
                    case "War":
                      bgColor = "#a59e9e";
                      break;
                    default:
                      bgColor = "#F0E68C";
                  }
                  return (
                    <i
                      key={item}
                      style={{ backgroundColor: bgColor }}
                      className="text"
                    >
                      {item + " " + " "}
                    </i>
                  );
                }
              })}
            </div>
          </div>
          <br />
          <div className="row">
            <div className="summary col-10 col-md-6 ">
              {ReactHtmlParser(String(show.summary))}
            </div>
          </div>

          <div className="schedule">
            <div id="label">
              schedule : <b>{time} </b>
            </div>
            {days.map((day) => {
              return (
                <div key={day} className="days">
                  {day}
                </div>
              );
            })}
          </div>
          <br />
          {officialsite != null ? (
            <button>
              <a className="sitelinks" href={officialsite}>
                Click here for Office site
              </a>
            </button>
          ) : (
            <button>
              <a className="sitelinks" href="#">
                Sorry, official site link unavailable.
              </a>
            </button>
          )}
          <button>
            <a className="sitelinks" href={show.url}>
              Click to watch on site
            </a>
          </button>
          <div>
            <div className="rating">
              {rating > 0 ? (
                <Rating
                  name="text-feedback"
                  value={rating}
                  readOnly
                  emptyIcon={
                    <StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />
                  }
                />
              ) : (
                <h6>Sorry, no ratings available!</h6>
              )}
            </div>
            <div className="row episodes">
              <div className="col-12 col-sm-12 col-md-12 col-xl-6">
                <a href={prevEpisode}>
                  <button type="button" className="btn btn-info">
                    <ArrowBackIosIcon style={{ fontSize: 15 }} /> Previous
                    episode
                  </button>
                </a>
              </div>
              <div className="col-12 col-sm-12 col-md-12 col-xl-6 ">
                {" "}
                <a href={prevEpisode}>
                  <button type="button" className="btn btn-info">
                    Next episode{" "}
                    <ArrowForwardIosIcon style={{ fontSize: 15 }} />
                  </button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
