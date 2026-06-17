import React, { useState } from "react";

const AddSongForm = ({ onSubmit, submitting }) => {
  const [formData, setFormData] = useState({
    title: "",
    artist: "",
    duration: "",
  });

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = "Song title is required";
    }

    if (!formData.artist.trim()) {
      newErrors.artist = "Artist name is required";
    }

    if (
      formData.duration &&
      !/^([0-5]?\d):([0-5]\d)$/.test(formData.duration)
    ) {
      newErrors.duration = "Duration must be in mm:ss format";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    await onSubmit({
      title: formData.title.trim(),
      artist: formData.artist.trim(),
      duration: formData.duration.trim(),
    });

    setFormData({
      title: "",
      artist: "",
      duration: "",
    });
  };

  return (
    <form className="add-song-form card" onSubmit={handleSubmit}>
      <h3>Add New Song</h3>

      <div className="form-group">
        <label>Song Title</label>
        <input
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Enter song title"
        />
        {errors.title && <small className="error">{errors.title}</small>}
      </div>

      <div className="form-group"  style={{ marginTop: '1rem' }}>
        <label>Artist</label>
        <input
          name="artist"
          value={formData.artist}
          onChange={handleChange}
          placeholder="Enter artist"
        />
        {errors.artist && <small className="error">{errors.artist}</small>}
      </div>

      <div className="form-group"  style={{ marginTop: '1rem' }}>
        <label>Duration</label>
        <input
          name="duration"
          value={formData.duration}
          onChange={handleChange}
          placeholder="03:45"
        />
        {errors.duration && (
          <small className="error">{errors.duration}</small>
        )}
      </div>

      <button disabled={submitting} className="btn btn-primary"  style={{ marginTop: '1rem' }}>
        {submitting ? "Adding..." : "Add Song"}
      </button>
    </form>
  );
};

export default AddSongForm;