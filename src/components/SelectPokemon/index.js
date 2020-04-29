import React from 'react';

function SelectPokemon({items, onChange}) {
    return(
        <select onChange={onChange}>
            {items.map((value, index) => (
                <option key={index} value={value}>{value}</option>
            ))}
        </select>
    );
}

export default SelectPokemon;