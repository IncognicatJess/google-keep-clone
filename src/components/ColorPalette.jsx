import React from 'react';
import PropTypes from 'prop-types';

// Daftar warna pastel
const PRESET_COLORS = [
  '#FFFFFF', // Putih
  '#FFADAD', // Pastel Merah/Pink
  '#FFD6A5', // Pastel Oranye
  '#FDFFB6', // Pastel Kuning
  '#CAFFBF', // Pastel Hijau
  '#9BF6FF', // Pastel Cyan/Teal
  '#A0C4FF', // Pastel Biru
  '#BDB2FF', // Pastel Ungu
  '#FFC6FF', // Pastel Magenta/Pink
];

function ColorPalette({ onSelectColor }) {
  return (
    <div className="color-palette">
      {PRESET_COLORS.map(color => (
        <div
          key={color}
          className="color-swatch"
          style={{ backgroundColor: color }}
          onClick={(e) => {
            e.stopPropagation(); // Mencegah klik 'menembus' ke 'note-view'
            onSelectColor(color);
          }}
        />
      ))}
    </div>
  );
}

ColorPalette.propTypes = {
  onSelectColor: PropTypes.func.isRequired,
};

export default ColorPalette;