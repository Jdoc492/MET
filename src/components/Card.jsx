import { Card, Metric, Text } from '@tremor/react';

export function CardUsageExample({titulo,valor}) {
  return (
    <Card
      className="mx-auto max-w-xs"
      decoration="top"
      decorationColor="indigo"
    >
      <p className="text-tremor-default text-tremor-content dark:text-dark-tremor-content">{titulo}</p>
      <p className="text-3xl text-tremor-content-strong dark:text-dark-tremor-content-strong font-semibold">{valor}</p>
    </Card>
  );
}