import type { Tables } from '@/types/types_db'; // Importando os tipos necessários

type Price = Tables<'prices'>;

export const getURL = (path: string = '') => {
  // Verifica se a variável de ambiente NEXT_PUBLIC_SITE_URL está definida e não está vazia.
  // Defina essa variável como a URL do seu site em ambientes de produção.
  let url =
    process?.env?.NEXT_PUBLIC_SITE_URL &&
    process.env.NEXT_PUBLIC_SITE_URL.trim() !== ''
      ? process.env.NEXT_PUBLIC_SITE_URL
      : // Se não estiver definida, verifica se a variável NEXT_PUBLIC_VERCEL_URL está presente,
        // que é automaticamente definida pelo Vercel.
        process?.env?.NEXT_PUBLIC_VERCEL_URL &&
          process.env.NEXT_PUBLIC_VERCEL_URL.trim() !== ''
        ? process.env.NEXT_PUBLIC_VERCEL_URL
        : // Caso contrário, define localhost para desenvolvimento local.
          'http://localhost:3000/';

  // Remove qualquer barra final na URL.
  url = url.replace(/\/+$/, '');
  // Garante que a URL inclua 'https://' quando não estiver em localhost.
  url = url.includes('http') ? url : `https://${url}`;
  // Remove barra inicial no caminho para evitar duplicidade de barras na URL final.
  path = path.replace(/^\/+/, '');

  // Retorna a URL concatenada com o caminho.
  return path ? `${url}/${path}` : url;
};

export const postData = async ({
  url,
  data
}: {
  url: string;
  data?: { price: Price };
}) => {
  const res = await fetch(url, {
    method: 'POST',
    headers: new Headers({ 'Content-Type': 'application/json' }),
    credentials: 'same-origin',
    body: JSON.stringify(data)
  });

  return res.json();
};

export const toDateTime = (secs: number) => {
  var t = new Date(0); // Inicia no início da época Unix.
  t.setSeconds(secs);
  return t;
};

export const calculateTrialEndUnixTimestamp = (
  trialPeriodDays: number | null | undefined
): number | undefined => {
  // Verifica se o trialPeriodDays é válido (não nulo, indefinido ou inferior a 1).
  if (!trialPeriodDays || trialPeriodDays < 1) return undefined;
  const currentDate = new Date();
  const trialEnd = new Date(
    currentDate.getTime() + trialPeriodDays * 24 * 60 * 60 * 1000
  );
  // Retorna a data de término do teste como um timestamp Unix (em segundos).
  return Math.floor(trialEnd.getTime() / 1000);
};

const toastKeyMap: { [key: string]: string[] } = {
  status: ['status', 'status_description'],
  error: ['error', 'error_description']
};

const getToastRedirect = (
  path: string,
  toastType: string,
  toastName: string,
  toastDescription: string = '',
  disableButton: boolean = false,
  arbitraryParams: string = ''
): string => {
  const [nameKey, descriptionKey] = toastKeyMap[toastType];

  let redirectPath = `${path}?${nameKey}=${encodeURIComponent(toastName)}`;

  if (toastDescription) {
    redirectPath += `&${descriptionKey}=${encodeURIComponent(toastDescription)}`;
  }

  if (disableButton) {
    redirectPath += `&disable_button=true`;
  }

  if (arbitraryParams) {
    redirectPath += `&${arbitraryParams}`;
  }

  return redirectPath;
};

export const getStatusRedirect = (
  path: string,
  statusName: string,
  statusDescription: string = '',
  disableButton: boolean = false,
  arbitraryParams: string = ''
) =>
  getToastRedirect(
    path,
    'status',
    statusName,
    statusDescription,
    disableButton,
    arbitraryParams
  );

export const getErrorRedirect = (
  path: string,
  errorName: string,
  errorDescription: string = '',
  disableButton: boolean = false,
  arbitraryParams: string = ''
) =>
  getToastRedirect(
    path,
    'error',
    errorName,
    errorDescription,
    disableButton,
    arbitraryParams
  );
