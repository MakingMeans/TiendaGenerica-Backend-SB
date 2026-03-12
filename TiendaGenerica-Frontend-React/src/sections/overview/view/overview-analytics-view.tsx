import { useState, useEffect } from "react";

import Grid from "@mui/material/Grid";

import { getBuys } from "src/modules/buy/buy.service";
import { DashboardContent } from "src/layouts/dashboard";
import { getSales } from "src/modules/sales/sales.service";
import { getProducts } from "src/modules/catalog/catalog.service";
import { getActiveClients } from "src/modules/clients/clients.service";
import { getActiveProviders } from "src/modules/suppliers/suppliers.service";

import { AnalyticsNews, AnalyticsNews1 } from "../analytics-news";
import { AnalyticsWidgetSummary } from "../analytics-widget-summary";

export function OverviewAnalyticsView() {
  const [salesTotal, setSalesTotal] = useState(0);
  const [clients, setClients] = useState<any[]>([]);
  const [products, setProducts] = useState<any[]>([]);
  const [suppliers, setSuppliers] = useState<any[]>([]);
  const [buysTotal, setBuysTotal] = useState(0);

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    const sales = await getSales();
    const activeClients = await getActiveClients();
    const catalog = await getProducts();
    const activeSuppliers = await getActiveProviders();
    const buys = await getBuys();

    const totalVentas = sales.reduce(
      (acc: number, sale: any) => acc + sale.totalFinal,
      0
    );

    const totalCompras = buys.reduce(
      (acc: number, buy: any) => acc + buy.total,
      0
    );

    const activeProducts = catalog.filter((p: any) => p.activo);

    setSalesTotal(totalVentas);
    setClients(activeClients);
    setProducts(activeProducts);
    setSuppliers(activeSuppliers);
    setBuysTotal(totalCompras);
  };

  return (
    <DashboardContent>
      <Grid container spacing={3}>
        
        {/* Ventas totales */}
        <Grid size={{ xs: 12, md: 6, lg: 8 }}>
            <AnalyticsWidgetSummary
    title="Ventas Totales"
    total={salesTotal}
    icon={<img alt="Purchase orders" src="/assets/icons/glass/ic-glass-buy.svg" />}
    
  />
        </Grid>

        {/* Clientes activos */}
        <Grid size={{ xs: 12, md: 6, lg: 4 }}>
          <AnalyticsWidgetSummary
  title="Clientes Activos"
  total={clients.length}
  icon={<img alt="New users" src="/assets/icons/glass/ic-glass-users.svg" />}
  
/>
        </Grid>

        {/* Productos activos */}
        <Grid size={{ xs: 12, md: 6, lg: 4 }}>
          <AnalyticsWidgetSummary
            title="Productos Activos"
            total={products.length}
  icon={<img alt="Weekly sales" src="/assets/icons/glass/ic-glass-bag.svg" />}
          />
        </Grid>

        {/* Proveedores activos */}
        <Grid size={{ xs: 12, md: 6, lg: 4 }}>
          <AnalyticsWidgetSummary
            title="Proveedores Activos"
            total={suppliers.length}
  icon={<img alt="New users" src="/assets/icons/glass/ic-glass-users.svg" />}
  
          />
        </Grid>

        {/* Proveedores activos */}
        <Grid size={{ xs: 12, md: 6, lg: 4 }}>
          <AnalyticsWidgetSummary
            title="Total compras"
            total={buysTotal}
  icon={<img alt="New users" src="/assets/icons/glass/ic-glass-users.svg" />}
  
          />
        </Grid>

        {/* Lista de clientes activos */}
        <Grid size={{ xs: 12, md: 6 }}>
          <AnalyticsNews
            title="Clientes Activos"
            list={clients.slice(0, 5).map((c) => ({
  id: String(c.idCliente),
  title: `${c.cedula} - ${c.nombre} ${c.apellido}`,
  description: "Cliente activo",
  coverUrl: "/assets/images/avatar/avatar-1.webp",
}))}
          />
        </Grid>

        {/* Catálogo activo */}
        <Grid size={{ xs: 12, md: 6 }}>
          <AnalyticsNews1
            title="Catálogo Activo"
            list={products.slice(0, 5).map((p) => ({
  id: String(p.codigo),
  title: `${p.codigo} - ${p.nombre}`,
  description: "Producto disponible",
  coverUrl: "/assets/images/product/product-1.webp",
}))}
          />
        </Grid>

      </Grid>
    </DashboardContent>
  );
}