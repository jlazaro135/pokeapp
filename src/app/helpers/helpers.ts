import { ElementRef } from "@angular/core";

export function getImageById(id: string | number): string {
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;
}

export function getFormattedName(name: string): string {
  let hasDash = name.includes('-');
  return hasDash ? name.replaceAll('-', ' ') : name;
}

export function convertWeightToKg(weight: number): string {
  return (weight / 10).toFixed(0);
}

export function convertHeightToCm(height: number): string {
  return (height * 10).toFixed(0);
}

export function isDesktop(): boolean {
  return window.innerWidth >= 992;
}

export function scrollToTop(elemenRef: ElementRef) {
  if (isDesktop()) return;
  elemenRef.nativeElement.ownerDocument.defaultView.scrollTo({
    top: 0,
    behavior: 'smooth', // esto hará que el desplazamiento sea suave
  });
}

