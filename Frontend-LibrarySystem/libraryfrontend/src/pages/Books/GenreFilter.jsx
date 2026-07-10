import React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import RadioButtonChecked from '@mui/icons-material/RadioButtonChecked';
import RadioButtonUnchecked from '@mui/icons-material/RadioButtonUnchecked';



const GenreFilter = ({genres, selectedGenreId, onGenreSelect}) => {

    const id = React.useId();
  return (
    <div className="bg-white rounded-lg shadow p-4 border borderr-gray-100">

        {/*Header */}
        <div className="flex items-center justify-between mb-4 pb-3 border-b border-gray-200">
            <h3 className="text-lg font-semibold">Filter by Genre</h3>
            {selectedGenreId &&(
                <button className="text-sm text-indigo-600 hover:text-indigo-800 font-medium transition-colors" onClick={() => onGenreSelect(null)}>
                    Clear
                </button>
            )}
        </div>

        {/* All Genres */}
      <div
        className={`flex items-center space-x-2 py-2 px-3 mb-2 rounded-lg cursor-pointer transition-all duration-200 ${
          !selectedGenreId
            ? "bg-indigo-50 text-indigo-700 font-semibold"
            : "hover:bg-gray-50 text-gray-700"
        }`}
        onClick={() => onGenreSelect(null)}
      >
        {!selectedGenreId ? (
          <RadioButtonChecked
            sx={{ fontSize: 16, color: "#4F46E5" }}
          />
        ) : (
          <RadioButtonUnchecked sx={{ fontSize: 16 }} />
        )}

        <span className="text-sm">All Genres</span>
      </div>

      <div className='space-y-1 pl-9 max-h-96 overflow-y-auto custom-scrollbar'>
        <FormControl>
      
      <RadioGroup
        aria-labelledby={`${id}-label`}
        defaultValue={selectedGenreId || "all"}
        name="radio-buttons-group"
        onChange={onGenreSelect}
      >
        
    {genres?.map((genre) => (
          <FormControlLabel
            key={genre.id}
            value={genre.id}
            control={<Radio />}
            label={genre.name}
          />
        ))}
        <FormControlLabel value="other" control={<Radio />} label="Other" />
      </RadioGroup>
    </FormControl>
      </div>

    </div>
  );
}

export default GenreFilter
