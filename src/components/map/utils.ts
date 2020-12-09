import L from 'leaflet';

export function createPortalIcon() {
  const element = document.createElement('div');
  document.createElement('div')
  element.setAttribute(
    'style',
    'display: flex; height: 0; width: 0; align-items: center; justify-content: center;'
  );
  return new PortalIcon({ element });
}

const PortalIcon = L.DivIcon.extend({
  options: {
    element: null,
  },
  createIcon() {
    return this.options.element;
  },
  getElement() {
    return this.options.element;
  },
}) as new (options: any) => any;
