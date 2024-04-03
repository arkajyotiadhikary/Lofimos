import React, { FC, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { deleteSong, getAllSongs } from "../services/songService";
import { Song } from "../types";
import Cookies from "js-cookie";

const SongsList: FC = () => {
      const navigate = useNavigate();
      const [songs, setSongs] = useState<Song[]>([]);

      useEffect(() => {
            const fetchSongs = async () => {
                  try {
                        const token = Cookies.get("token");
                        if (!token) {
                              navigate("/auth");
                              return;
                        }

                        const songs = await getAllSongs(token);
                        setSongs(songs);
                  } catch (error) {
                        console.error("Error fetching songs:", error);
                        navigate("/auth");
                  }
            };

            fetchSongs();
      }, [navigate]);

      const handleEdit = (id: number, song: Song) => {
            navigate(`/edit/${id}`, { state: { id, song } });
      };

      const handleDelete = async (id: number) => {
            try {
                  const response = await deleteSong(id, Cookies.get("token") || "");
                  if (response?.status === 204) {
                        // Remove the deleted song from the songs state
                        console.log("Delete response", response);
                        setSongs((prevSongs) => prevSongs.filter((song) => song.SongID !== id));
                  }
            } catch (error) {
                  console.error("Error deleting song:", error);
            }
      };

      return (
            <div className="container mx-auto px-10 py-10">
                  {/* Header */}
                  <header
                        className="flex justify-between items-center p-10 h-40 bg-center bg-no-repeat bg-cover backdrop-blur-3xl backdrop-brightness-150 md:backdrop-filter-none"
                        style={{
                              backgroundImage: `url(https://img.freepik.com/free-vector/gradient-lo-fi-illustrations_52683-82981.jpg?w=740&t=st=1711708994~exp=1711709594~hmac=2717141f34bec9d8f1cef63ae74ccfa6532e75e943ec505d418984fdd7dcf663)`,
                        }}
                  >
                        <h1 className="text-3xl font-bold text-white text-shadow-lg">Songs</h1>
                        <button
                              className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded shadow-lg"
                              onClick={() => navigate("/upload")}
                        >
                              <FontAwesomeIcon icon={faEdit} className="mr-2 text-lg" />
                              <span className="tracking-wide">Add Song</span>
                        </button>
                  </header>
                  {/* Songs */}
                  <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
                        {songs.map((song) => (
                              <div
                                    key={song.SongID}
                                    className="bg-white rounded-lg shadow-sm hover:shadow-lg transition-all duration-200 ease-in-out p-5"
                              >
                                    {/* Image */}
                                    <div className="w-full h-48 relative mt-10">
                                          <img
                                                className="object-cover w-full h-full rounded-t-lg"
                                                src={song.CoverArtPath}
                                                alt=""
                                          />
                                          <div className="absolute bottom-0 right-0 mb-2 mr-2">
                                                <button
                                                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded"
                                                      onClick={() => handleEdit(song.SongID, song)}
                                                >
                                                      <FontAwesomeIcon
                                                            icon={faEdit}
                                                            className="mr-2"
                                                      />
                                                      Edit
                                                </button>
                                                <button
                                                      className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
                                                      onClick={() => handleDelete(song.SongID)}
                                                >
                                                      <FontAwesomeIcon
                                                            icon={faTrash}
                                                            className="mr-2"
                                                      />
                                                      Delete
                                                </button>
                                          </div>
                                    </div>
                                    <div className="mt-5">
                                          {/* Title */}
                                          <p className="text-lg font-bold">{song.Title}</p>
                                          {/* Artist name */}
                                          <p className="text-sm">{song.Artist}</p>
                                          {/* Duration */}
                                          <p className="text-sm">{song.Duration}</p>
                                    </div>
                              </div>
                        ))}
                  </div>
            </div>
      );
};

export default SongsList;
