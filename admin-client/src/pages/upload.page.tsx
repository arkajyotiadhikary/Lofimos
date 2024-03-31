import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

interface FormData {
      Title: string;
      Artist: string;
      Album?: string;
      ReleaseYear?: number;
      Genre?: string;
      Duration?: string;
      TrackNumber?: number;
      AudioFilePath: string;
      CoverArtPath?: string;
      ThumbnailPath?: string;
      Lyrics?: string;
      Likes: number;
      Dislikes: number;
      PlayCount: number;
      IsFavorite: boolean;
      Comments?: string;
      BPM?: number;
      Key?: string;
      Mood?: string;
      SpotifyLink?: string;
      AppleMusicLink?: string;
      YouTubeLink?: string;
      ArtistWebsite?: string;
      SampleInformation?: string;
      Credits?: string;
      CreatedAt: Date;
}

const Upload: React.FC = () => {
      const navigate = useNavigate();
      const [formData, setFormData] = useState<FormData>({
            Title: "",
            Artist: "",
            Album: "",
            ReleaseYear: undefined,
            Genre: "",
            Duration: "",
            TrackNumber: undefined,
            AudioFilePath: "",
            CoverArtPath: "",
            ThumbnailPath: "",
            Lyrics: "",
            Likes: 0,
            Dislikes: 0,
            PlayCount: 0,
            IsFavorite: false,
            Comments: "",
            BPM: undefined,
            Key: "",
            Mood: "",
            SpotifyLink: "",
            AppleMusicLink: "",
            YouTubeLink: "",
            ArtistWebsite: "",
            SampleInformation: "",
            Credits: "",
            CreatedAt: new Date(),
      });

      // useEffect(() => {
      //       const token = localStorage.getItem("token");
      //       if (!token) {
      //             navigate("/auth");
      //       }
      // });

      return (
            <div className="upload flex justify-center p-10">
                  <form className="space-y-6 w-1/2">
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
                                    Upload
                              </h1>
                              <p className="mt-2 text-white text-xl font-semibold text-shadow-md">
                                    Share your music with the world
                              </p>
                        </header>
                        {/* Loop through formData keys to generate form inputs */}
                        {Object.keys(formData).map((key) => (
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
                                          ></textarea>
                                    ) : (
                                          <div className="w-full pl-2">
                                                <input
                                                      className="form-input block w-full px-3 py-2 transition duration-150 ease-in-out sm:text-sm sm:leading-5 border border-gray-200 rounded-md focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                                      id={key}
                                                      name={key}
                                                />
                                          </div>
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

export default Upload;
