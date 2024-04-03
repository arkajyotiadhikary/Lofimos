import React, { FC, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import { useNavigate, useLocation } from "react-router-dom";
import { Song } from "../types";
import { updateSong } from "../services/songService";
import Cookies from "js-cookie";

const Edit: FC = () => {
      const navigate = useNavigate();
      const location = useLocation();
      const [formData, setFormData] = useState<Omit<Partial<Song>, "SongID">>({
            Title: location.state.song.Title,
            Artist: location.state.song.Artist,
            Album: location.state.song.Album,
            ReleaseYear: location.state.song.ReleaseYear,
            Genre: location.state.song.Genre,
            Duration: location.state.song.Duration,
            TrackNumber: location.state.song.TrackNumber,
            AudioFilePath: location.state.song.AudioFilePath,
            CoverArtPath: location.state.song.CoverArtPath,
            ThumbnailPath: location.state.song.ThumbnailPath,
            Lyrics: location.state.song.Lyrics,
            Likes: location.state.song.Likes,
            Dislikes: location.state.song.Dislikes,
            PlayCount: location.state.song.PlayCount,
            IsFavorite: location.state.song.IsFavorite,
            Comments: location.state.song.Comments,
            BPM: location.state.song.BPM,
            Key: location.state.song.Key,
            Mood: location.state.song.Mood,
            SpotifyLink: location.state.song.SpotifyLink,
            AppleMusicLink: location.state.song.AppleMusicLink,
            YouTubeLink: location.state.song.YouTubeLink,
            ArtistWebsite: location.state.song.ArtistWebsite,
            SampleInformation: location.state.song.SampleInformation,
            Credits: location.state.song.Credits,
      });

      const handleChange = (
            event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>
      ) => {
            const { name, value } = event?.target;
            setFormData((prev) => ({ ...prev, [name]: value }));
      };
      const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            try {
                  const response: Partial<Song> | undefined = await updateSong(
                        location.state.id,
                        formData,
                        Cookies.get("token")!
                  );
                  if (response) navigate("/songs");
            } catch (error) {
                  console.log(error);
            }
      };
      return (
            <div className="upload flex justify-center p-10">
                  <form className="space-y-6 w-1/2" onSubmit={handleSubmit}>
                        <header
                              className="relative flex flex-col justify-center items-center bg-center bg-no-repeat bg-cover h-40 backdrop-blur-3xl backdrop-brightness-150 md:backdrop-filter-none"
                              style={{
                                    backgroundImage: `url(https://img.freepik.com/premium-photo/anime-girl-sitting-couch-front-window-with-view-city-generative-ai_901242-909.jpg?w=900)`,
                              }}
                        >
                              {/* Close button */}
                              <button
                                    onClick={() => {
                                          navigate("/songs");
                                    }}
                                    className="absolute top-4 right-4 text-red-500 text-2xl hover:text-red-700"
                              >
                                    <FontAwesomeIcon icon={faTimesCircle} />
                              </button>
                              <h1 className="text-white text-5xl font-black text-shadow-md">
                                    Edit
                              </h1>
                              <p className="mt-2 text-white text-xl font-semibold text-shadow-md">
                                    Update your song details
                              </p>
                        </header>
                        {/* Loop through formData keys to generate form inputs */}
                        {Object.entries(formData).map(([key, value]) => (
                              <div key={key} className="flex items-center">
                                    <label
                                          className="block text-sm font-medium leading-5 text-gray-700 mr-2"
                                          htmlFor={key}
                                    >
                                          {key}
                                    </label>
                                    {key === "Lyrics" ? (
                                          <textarea
                                                className="form-input block w-full px-3 py-2 transition duration-150 ease-in-out sm:text-sm sm:leading-5 border border-gray-200 rounded-md focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                                id={key}
                                                name={key}
                                                defaultValue={value as string}
                                                onChange={handleChange}
                                          ></textarea>
                                    ) : (
                                          <input
                                                type="text"
                                                className="form-input block w-full px-3 py-2 transition duration-150 ease-in-out sm:text-sm sm:leading-5 border border-gray-200 rounded-md focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                                id={key}
                                                name={key}
                                                defaultValue={value as string}
                                                onChange={handleChange}
                                          />
                                    )}
                              </div>
                        ))}
                        {/* submit button */}
                        <div className="flex justify-center">
                              <button
                                    type="submit"
                                    className="px-4 py-2 text-sm font-medium leading-5 text-white bg-blue-600 rounded hover:bg-blue-500 focus:outline-none focus:bg-blue-500 "
                              >
                                    Submit
                              </button>
                        </div>
                  </form>
            </div>
      );
};

export default Edit;
