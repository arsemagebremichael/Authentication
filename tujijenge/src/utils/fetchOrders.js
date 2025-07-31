const baseUrl = process.env.REACT_APP_BASE_URL;

export function setToken(token) {
  localStorage.setItem("token", token);
}

export function getToken() {
  return localStorage.getItem("token");
}

export function removeToken() {
  localStorage.removeItem("token");
}

export const fetchOrders = async ({
  groupId,
  searchQuery,
  page = 1,
  limit = 10,
  groupByDateAndCommunity = true,
  communities = {},
  customers = {},
  products = {},
} = {}) => {
  try {
    const token = getToken();
    if (!token) throw new Error("No authentication token found. Please log in.");

    const response = await fetch(`${baseUrl}orders/`, {
      headers: {
        'Authorization': `Token ${token}`,
      },
    });

    if (!response.ok) throw new Error(`Something went wrong: ${response.status}`);

    const data = await response.json();
    if (!Array.isArray(data)) throw new Error('API response is not an array');

    let orders;

    if (groupByDateAndCommunity) {
      const groupedOrders = data.reduce((acc, order) => {
        const communityName = communities[order.community] || 'Unknown Community';
        const key = `${order.order_date}_${communityName}`;

        const quantity = parseInt(order.quantity, 10) || 1;
        const productName = products[order.product] || 'Unknown Product';

        if (!acc[key]) {
          acc[key] = {
            orderIds: [order.order_id],
            mamamboga: order.mamamboga,
            community: { name: communityName, community_id: order.community },
            products: [
              `${productName} x${quantity}`
            ],
            total_price: parseFloat(order.total_price || 0),
            order_date: order.order_date,
            location: (customers[order.mamamboga]?.address) || 'No location',
          };
        } else {
          acc[key].orderIds.push(order.order_id);
          acc[key].products.push(`${productName} x${quantity}`);
          acc[key].total_price += parseFloat(order.total_price || 0);
        }
        return acc;
      }, {});
      orders = Object.values(groupedOrders).map(group => ({
        id: group.orderIds[0],
        mamamboga: group.mamamboga, 
        community: group.community?.name || 'Unknown Community',
        total: `${group.total_price.toFixed(2)} KSH`,
        date: group.order_date
          ? new Date(group.order_date).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })
          : 'Unknown Date',
        products: group.products,
        groupId: group.community?.community_id || null,
        status: 'pending',
        communityId: group.community?.community_id || null,
      }));
    } else {
      orders = data.map(order => {
        const quantity = parseInt(order.quantity, 10) || 1;
        const productName = products[order.product] || 'Unknown Product';
        return {
          id: order.order_id,
          mamamboga: order.mamamboga,
          community: communities[order.community] || 'Unknown Community',
          location: (customers[order.mamamboga]?.address) || 'No location',
          total: `${parseFloat(order.total_price || 0).toFixed(2)} KSH`,
          date: order.order_date
            ? new Date(order.order_date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })
            : 'Unknown Date',
          products: [`${productName} x${quantity}`],
          groupId: order.community || null,
          status: 'pending',
          communityId: order.community || null,
        };
      });
    }

    if (groupId) {
      orders = orders.filter(order => order.groupId === parseInt(groupId, 10));
    }
    if (searchQuery) {
      const lowerQuery = searchQuery.toLowerCase().trim();
      orders = orders.filter(order =>
        (customers[order.mamamboga]
          ? `${customers[order.mamamboga].first_name} ${customers[order.mamamboga].last_name || ''}`.toLowerCase()
          : ''
        ).includes(lowerQuery)
        || (order.community || '').toLowerCase().includes(lowerQuery)
      );
    }

    const start = (page - 1) * limit;
    const paginatedOrders = orders.slice(start, start + limit);

    return { paginatedOrders, total: orders.length };
  } catch (error) {
    console.error('Fetch orders error:', error);
    throw new Error(error.message ?? "An error occurred");
  }
};