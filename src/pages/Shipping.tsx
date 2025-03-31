export default function Shipping() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Доставка та оплата</h1>
      
      <div className="max-w-2xl mx-auto space-y-8">
        <section className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Способи доставки:</h2>
          <ul className="space-y-4">
            <li className="flex items-start space-x-3">
              <span className="font-medium">Нова пошта:</span>
              <span>Доставка по всій Україні 1-2 дні</span>
            </li>
            <li className="flex items-start space-x-3">
              <span className="font-medium">Укрпошта:</span>
              <span>Доставка по всій Україні 2-4 дні</span>
            </li>
          </ul>
        </section>

        <section className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Безкоштовна доставка:</h2>
          <p>При замовленні від 2-х одиниць товару - доставка безкоштовна!</p>
        </section>

        <section className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Терміни відправки:</h2>
          <p>Відправка замовлення здійснюється в день оплати при оформленні до 15:00</p>
        </section>
      </div>
    </div>
  );
}