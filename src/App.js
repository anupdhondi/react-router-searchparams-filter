import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';

const options = [
  {
    label: 'Name',
    value: 'name',
  },
  {
    label: 'Price High',
    value: 'priceDesc',
  },
  {
    label: 'Price Low',
    value: 'priceAsc',
  },
];

export default function App() {
  const [searchInput, setSearchInput] = useSearchParams();
  const [data, setData] = useState([]);

  useEffect(() => {
    let url = 'http://localhost:3001/items';
    axios
      .get(url, {
        params: searchInput,
      })
      .then((res) => {
        setData(res.data.products);
      });
  }, [searchInput]);

  const inputHandler = (e) => {
    const text = e.target.value;

    if (!text.trim().length) {
      searchInput.delete('query');
      setSearchInput(searchInput, {
        replace: true,
      });
    } else {
      searchInput.set('query', text);
      setSearchInput(searchInput, {
        replace: true,
      });
    }
  };

  const selectHandler = (e) => {
    const text = e.target.value;
    searchInput.set('sort', text);
    setSearchInput(searchInput, {
      replace: true,
    });
  };

  return (
    <>
      <div>
        <input
          type="string"
          value={searchInput.get('query') ?? ''}
          onChange={inputHandler}
        />
        <div className="select-container">
          <select
            value={searchInput.get('sort') ?? 'name'}
            onChange={selectHandler}>
            {options.map((option, i) => (
              <option key={i} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
        <div>
          {data &&
            data.map((el, i) => {
              return (
                <div key={i + 'ajbfas'}>
                  <span>{el.name}</span>
                  <img src={el.src} alt={el.name} />
                </div>
              );
            })}
        </div>
      </div>
    </>
  );
}
