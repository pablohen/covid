import router from 'next/router';
import { ChangeEvent, useState } from 'react';
import Autocomplete from 'react-autocomplete';
import slugify from 'slugify';
import City from '../interfaces/City';
import { Toaster, toast } from 'react-hot-toast';

interface Props {
  cities: City[];
}

const CitySearchBar = ({ cities }: Props) => {
  const [selectedItem, setSelectedItem] = useState('');
  const minLength = 2;

  const filterList = () => {
    if (selectedItem.length < minLength) return [];

    return cities.filter((city) =>
      slugify(city.name, { lower: true }).includes(
        slugify(selectedItem, { lower: true })
      )
    );
  };

  return (
    <div className="w-full">
      <Autocomplete
        getItemValue={(item: City) => item.name}
        items={filterList()}
        renderItem={(item: City, isHighlighted: Boolean) => (
          <div
            key={item.id}
            className={`px-2 ${
              isHighlighted
                ? 'bg-purple-200 dark:bg-gray-800 font-bold'
                : 'bg-transparent dark:bg-black'
            }`}
          >
            {item.name}
          </div>
        )}
        value={selectedItem}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setSelectedItem(e.target.value)
        }
        onSelect={(val: string, item: City) => {
          router.push(`/${item.id}`);
          toast.loading('Carregando...', {
            position: 'bottom-center',
            duration: 2000,
          });
          setSelectedItem(val);
        }}
        wrapperProps={{
          style: { display: 'flex' },
          className: 'flex justify-center',
        }}
        inputProps={{
          placeholder: 'Escolha uma cidade do Brasil...',
          className:
            'flex border dark:border-gray-500 rounded-full shadow-sm px-4 py-2 w-10/12 lg:w-4/12 transform transition-all duration-150 hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 focus:border-purple-500 dark:focus:border-gray-500',
        }}
        menuStyle={{
          borderRadius: '3px',
          boxShadow: '0 2px 12px rgba(0, 0, 0, 0.1)',
          background: 'rgba(255, 255, 255, 0.9)',
          padding: '0',
          position: 'fixed',
          overflow: 'auto',
          maxHeight: '10em',
        }}
      />
      <Toaster />
    </div>
  );
};

export default CitySearchBar;
