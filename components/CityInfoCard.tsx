import React from 'react';
import CountUp from 'react-countup';

interface Props {
  city: string;
  state: string;
  population: number;
  confirmed: number;
  deaths: number;
  deathRate: number;
  date: Date;
}

const CityInfoCard = ({
  city,
  state,
  population,
  confirmed,
  deaths,
  deathRate,
  date,
}: Props) => {
  const formatNumber = (n: number) => {
    return n.toLocaleString();
  };

  return (
    <div className="flex flex-col justify-center items-center text-center md:flex-row md:justify-between md:text-left w-full lg:w-1/2 h-full border border-purple-500 rounded bg-white p-4 pt-8 md:pt-8 shadow-md relative">
      <div className="space-y-2">
        <p className="font-bold text-2xl text-purple-500">
          {`${city}/${state}`}
        </p>
        <p className="text-lg text-purple-500">
          {population.toLocaleString()} habitantes (estimativa)
        </p>
      </div>

      <div>
        <p className="text-sm text-purple-500">
          <CountUp
            end={confirmed}
            duration={1}
            className="font-bold"
            formattingFn={formatNumber}
          />{' '}
          casos confirmados
        </p>
        <p className="text-sm text-purple-500">
          <CountUp
            end={deaths}
            duration={1}
            formattingFn={formatNumber}
            className="font-bold"
          />{' '}
          óbitos
        </p>
        <p className="text-sm text-purple-500">
          <span className="font-bold">
            {Number(deathRate * 100).toPrecision(2)}%
          </span>{' '}
          de letalidade
        </p>
      </div>

      <p className="absolute text-white text-xs font-bold bg-purple-500 p-1 rounded-bl top-0 right-0">
        {`Atualizado em: ${new Date(date).toLocaleDateString()}`}
      </p>
    </div>
  );
};

export default CityInfoCard;
