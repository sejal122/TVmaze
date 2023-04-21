import React, { useEffect, useState } from "react";
import axios, * as others from "https://cdn.skypack.dev/axios@0.21.1";
import ReactHtmlParser from "html-react-parser";
import { Outlet, Link } from "react-router-dom";
import "./allshows.css";
export default function Allshows() {
  const [tvload, setTvload] = useState([]);
  const getData = () => {
    axios.get(`https://api.tvmaze.com/search/shows?q=a`).then((response) => {
      console.clear();
      console.log(response.data);
      setTvload(response.data);
    });
  };
  useEffect(() => {
    getData();
  }, []);
  return (
    <div className="layout">
      <h1>Recent schedule</h1>
      <div className="row mx-auto">
        {tvload.map((show, key) => {
          return (
            <Link
              className="link card mx-auto col-10 col-sm-10 col-md-10 col-lg-5 col-xl-5"
              to={`/show/${show.show.id}`}
            >
              <div key={show.show.id}>
                <div className="card-horizontal">
                  <div className="img-square-wrapper">
                    <img
                      className=""
                      src={
                        show.show.image === null
                          ? "https://via.placeholder.com/210x295/111217/FFFFF/?text=No%20Image"
                          : show.show.image.medium
                      }
                      alt={show.show.name}
                    />
                  </div>
                  <div className="card-body">
                    <h4 className="card-title">{show.show.name}</h4>
                    {
                      <span className="card-text">
                        {ReactHtmlParser(String(show.show.summary))}
                      </span>
                    }
                  </div>
                </div>
                <div className="card-footer">
                  {show.show.genres.map((elem) => {
                    let bgColor = "#F0E68C";
                    {
                      switch (elem) {
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
                    }
                    return (
                      <small
                        key={elem}
                        style={{ backgroundColor: bgColor }}
                        className="genere"
                      >
                        {elem + " " + " "}
                      </small>
                    );
                  })}
                </div>
              </div>
            </Link>
          );
        })}
      </div>
      <Outlet />
    </div>
  );
}
