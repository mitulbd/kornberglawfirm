// app/components/Header.js
import HeaderServer from './HeaderServer';
import HeaderClient from './HeaderClient';

export default async function Header() {
  return (
    <HeaderClient>
      <HeaderServer />
    </HeaderClient>
  );
}
