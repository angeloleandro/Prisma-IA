// utils/supabase/queries.ts

import { SupabaseClient } from '@supabase/supabase-js';
import { cache } from 'react';

export const getUser = cache(async (supabase: SupabaseClient) => {
  const {
    data: { user },
    error
  } = await supabase.auth.getUser();

  if (error) {
    console.error('Erro ao obter usuário:', error.message);
    return null; // Ou lance um erro, dependendo da sua lógica
  }

  return user;
});

export const getSubscription = cache(async (supabase: SupabaseClient) => {
  const { data: subscription, error } = await supabase
    .from('subscriptions')
    .select('*, prices(*, products(*))')
    .in('status', ['trialing', 'active'])
    .maybeSingle();

  if (error) {
    console.error('Erro ao obter assinatura:', error.message);
    return null; // Ou lance um erro, dependendo da sua lógica
  }

  return subscription;
});

export const getProducts = cache(async (supabase: SupabaseClient) => {
  const { data: products, error } = await supabase
    .from('products')
    .select('*, prices(*)')
    .eq('active', true)
    .eq('prices.active', true)
    .order('metadata->index')
    .order('unit_amount', { referencedTable: 'prices' });

  if (error) {
    console.error('Erro ao obter produtos:', error.message);
    return [];
  }

  return products;
});

export const getUserDetails = cache(async (supabase: SupabaseClient) => {
  const { data: userDetails, error } = await supabase
    .from('users')
    .select('*')
    .single();

  if (error) {
    console.error('Erro ao obter detalhes do usuário:', error.message);
    return null;
  }

  return userDetails;
});
