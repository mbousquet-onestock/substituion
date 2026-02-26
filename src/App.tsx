import { useState } from 'react';
import { 
  Package, 
  User, 
  MapPin, 
  CreditCard, 
  ChevronDown, 
  ChevronUp, 
  Printer, 
  Search, 
  Filter, 
  Truck, 
  Store,
  Pencil,
  List,
  Clock
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { MOCK_ORDER } from './mockData';
import { OrderItem, Package as PackageType } from './types';

const StatusBadge = ({ status }: { status: string }) => {
  const getStyles = () => {
    switch (status) {
      case 'Traité':
        return 'bg-emerald-50 text-emerald-600 border-emerald-100';
      case 'Substitué':
        return 'bg-orange-50 text-orange-600 border-orange-100';
      case 'Collecté':
        return 'bg-blue-50 text-blue-600 border-blue-100';
      case 'Expédié':
        return 'bg-blue-50 text-blue-600 border-blue-100';
      default:
        return 'bg-gray-50 text-gray-600 border-gray-100';
    }
  };

  return (
    <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium border ${getStyles()}`}>
      {status}
    </span>
  );
};

const SectionHeader = ({ title, count, icon: Icon, onToggle, isOpen }: any) => (
  <button 
    onClick={onToggle}
    className="w-full flex items-center justify-between py-4 px-6 bg-white border-b border-gray-100 first:rounded-t-xl"
  >
    <div className="flex items-center gap-2">
      <span className="text-sm font-semibold text-gray-900">{title}</span>
      {count !== undefined && (
        <span className="bg-gray-100 text-gray-600 text-[10px] px-1.5 py-0.5 rounded-md font-medium">
          {count}
        </span>
      )}
    </div>
    {isOpen ? <ChevronUp className="w-4 h-4 text-gray-400" /> : <ChevronDown className="w-4 h-4 text-gray-400" />}
  </button>
);

export default function App() {
  const [orderData, setOrderData] = useState(MOCK_ORDER);
  const [editingImage, setEditingImage] = useState<{ id: string, url: string } | null>(null);
  const [openSections, setOpenSections] = useState({
    articles: true,
    preparation: true,
    history: true,
    packages: { '6176000009559-1': true, '6176000009559-2': true }
  });

  const toggleSection = (section: string) => {
    setOpenSections(prev => ({ ...prev, [section]: !prev[section as keyof typeof prev] }));
  };

  const togglePackage = (id: string) => {
    setOpenSections(prev => ({
      ...prev,
      packages: { ...prev.packages, [id]: !prev.packages[id as keyof typeof prev.packages] }
    }));
  };

  const handleImageUpdate = (id: string, newUrl: string) => {
    const updateItems = (items: OrderItem[]) => 
      items.map(item => {
        if (item.id === id) return { ...item, image: newUrl };
        if (item.substitutedBy?.id === id) return { ...item, substitutedBy: { ...item.substitutedBy, image: newUrl } };
        return item;
      });

    setOrderData(prev => ({
      ...prev,
      articles: {
        delivery: updateItems(prev.articles.delivery),
        pickup: updateItems(prev.articles.pickup)
      },
      packages: prev.packages.map(pkg => ({
        ...pkg,
        items: updateItems(pkg.items)
      }))
    }));
    setEditingImage(null);
  };

  const ItemRow = ({ item, isSubstituted = false }: { item: OrderItem; isSubstituted?: boolean; key?: string }) => (
    <div className={`flex items-start gap-4 py-3 group relative ${isSubstituted ? 'pl-12 border-l-2 border-gray-100 ml-4' : ''}`}>
      <div className="relative">
        <img src={item.image} alt={item.name} className="w-12 h-12 rounded object-cover border border-gray-100" />
        <button 
          onClick={() => setEditingImage({ id: item.id, url: item.image })}
          className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded"
        >
          <Pencil className="w-3 h-3 text-white" />
        </button>
      </div>
      <div className="flex-1 min-w-0">
        <h4 className="text-sm font-medium text-gray-900 truncate">{item.name}</h4>
        <p className="text-xs text-gray-500">
          {item.price.toFixed(2)}€ | {item.unit}
        </p>
        <p className="text-[10px] text-gray-400 font-mono">{item.ean}</p>
      </div>
      <div className="flex flex-col items-end gap-2">
        <StatusBadge status={item.status} />
        <span className="text-xs text-gray-600">Qté {item.quantity}</span>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen p-6 font-sans">
      {/* Image Edit Modal */}
      <AnimatePresence>
        {editingImage && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/20 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-xl shadow-xl border border-gray-200 p-6 w-full max-w-md"
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Modifier l'URL de l'image</h3>
              <div className="space-y-4">
                <div className="flex justify-center mb-4">
                  <img src={editingImage.url} className="w-24 h-24 rounded-lg border border-gray-100 object-cover" alt="Preview" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-500 uppercase mb-1">URL de l'image</label>
                  <input 
                    type="text" 
                    value={editingImage.url}
                    onChange={(e) => setEditingImage({ ...editingImage, url: e.target.value })}
                    className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                    placeholder="https://..."
                  />
                </div>
                <div className="flex gap-3 pt-2">
                  <button 
                    onClick={() => setEditingImage(null)}
                    className="flex-1 px-4 py-2 text-sm font-medium text-gray-600 bg-gray-50 rounded-lg hover:bg-gray-100"
                  >
                    Annuler
                  </button>
                  <button 
                    onClick={() => handleImageUpdate(editingImage.id, editingImage.url)}
                    className="flex-1 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700"
                  >
                    Enregistrer
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-6">
          {/* Articles Section */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <SectionHeader 
              title="Articles" 
              count={5} 
              isOpen={openSections.articles}
              onToggle={() => toggleSection('articles')}
            />
            <AnimatePresence>
              {openSections.articles && (
                <motion.div 
                  initial={{ height: 0 }}
                  animate={{ height: 'auto' }}
                  exit={{ height: 0 }}
                  className="overflow-hidden"
                >
                  <div className="p-6 space-y-8">
                    {/* Delivery Group */}
                    <div>
                      <div className="flex items-center gap-2 mb-4">
                        <MapPin className="w-4 h-4 text-gray-400" />
                        <div>
                          <p className="text-xs font-semibold text-gray-900">Livraison à domicile</p>
                          <p className="text-[10px] text-gray-400">Traiteur</p>
                        </div>
                      </div>
                      <div className="space-y-2">
                        {orderData.articles.delivery.map(item => (
                          <ItemRow key={item.id} item={item} />
                        ))}
                      </div>
                    </div>

                    {/* Pickup Group */}
                    <div>
                      <div className="flex items-center gap-2 mb-4">
                        <MapPin className="w-4 h-4 text-gray-400" />
                        <div>
                          <p className="text-xs font-semibold text-gray-900">Retrait magasin</p>
                          <p className="text-[10px] text-gray-400">Drive</p>
                        </div>
                      </div>
                      <div className="space-y-4">
                        {orderData.articles.pickup.map(item => (
                          <div key={item.id}>
                            <ItemRow item={item} />
                            {item.substitutedBy && (
                              <ItemRow item={item.substitutedBy} isSubstituted />
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Preparation Section */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <SectionHeader 
              title="Préparation" 
              count={2} 
              isOpen={openSections.preparation}
              onToggle={() => toggleSection('preparation')}
            />
            <AnimatePresence>
              {openSections.preparation && (
                <motion.div 
                  initial={{ height: 0 }}
                  animate={{ height: 'auto' }}
                  exit={{ height: 0 }}
                  className="overflow-hidden"
                >
                  <div className="p-6 space-y-6">
                    {orderData.packages.map((pkg) => (
                      <div key={pkg.id} className="border border-gray-100 rounded-lg overflow-hidden">
                        <div className="flex items-center justify-between p-4 bg-gray-50/50">
                          <div className="flex items-center gap-3">
                            <div className="p-2 bg-cyan-50 rounded-lg">
                              <Truck className="w-4 h-4 text-cyan-600" />
                            </div>
                            <span className="text-sm font-medium text-gray-900">{pkg.id}</span>
                            <StatusBadge status={pkg.status} />
                          </div>
                          <button onClick={() => togglePackage(pkg.id)}>
                            {openSections.packages[pkg.id as keyof typeof openSections.packages] ? 
                              <ChevronUp className="w-4 h-4 text-gray-400" /> : 
                              <ChevronDown className="w-4 h-4 text-gray-400" />
                            }
                          </button>
                        </div>
                        
                        <AnimatePresence>
                          {openSections.packages[pkg.id as keyof typeof openSections.packages] && (
                            <motion.div 
                              initial={{ height: 0 }}
                              animate={{ height: 'auto' }}
                              exit={{ height: 0 }}
                              className="overflow-hidden"
                            >
                              <div className="p-4 space-y-4">
                                <div className="flex items-start justify-between">
                                  <div className="flex items-start gap-3">
                                    <div className="p-2 bg-gray-100 rounded-lg">
                                      {pkg.shippingInfo ? <Truck className="w-4 h-4 text-gray-500" /> : <Store className="w-4 h-4 text-gray-500" />}
                                    </div>
                                    <div>
                                      <p className="text-xs font-semibold text-gray-900">{pkg.location}</p>
                                      <p className="text-[10px] text-gray-400">{pkg.email} | {pkg.phone}</p>
                                      {pkg.shippingInfo && (
                                        <p className="text-[10px] text-gray-400 mt-1">
                                          Expédié le {pkg.shippingInfo.date} | {pkg.shippingInfo.method} • {pkg.shippingInfo.tracking}
                                        </p>
                                      )}
                                    </div>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    {pkg.shippingInfo && (
                                      <button className="px-3 py-1 text-[10px] font-medium border border-gray-200 rounded-md hover:bg-gray-50">
                                        Suivre le colis
                                      </button>
                                    )}
                                    <button className="p-1.5 text-gray-400 hover:text-gray-600">
                                      <Printer className="w-4 h-4" />
                                    </button>
                                  </div>
                                </div>

                                <div className="pl-12 border-l-2 border-gray-50 space-y-2">
                                  {pkg.items.map(item => (
                                    <div key={item.id}>
                                      <ItemRow item={item} />
                                      {item.substitutedBy && <ItemRow item={item.substitutedBy} isSubstituted />}
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* History Section */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="p-6 border-b border-gray-100">
              <h3 className="text-sm font-semibold text-gray-900">Historique</h3>
            </div>
            <div className="p-6">
              <div className="flex items-center gap-4 mb-6">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input 
                    type="text" 
                    placeholder="Search" 
                    className="w-full pl-10 pr-4 py-2 text-xs border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                  />
                </div>
                <button className="flex items-center gap-2 px-4 py-2 text-xs font-medium border border-gray-200 rounded-lg hover:bg-gray-50">
                  <Filter className="w-4 h-4" />
                  Filtrer
                </button>
              </div>

              <div className="space-y-6 relative before:absolute before:left-[103px] before:top-2 before:bottom-2 before:w-px before:bg-gray-100">
                {orderData.history.map((event, idx) => (
                  <div key={idx} className="flex items-start gap-8 relative">
                    <div className="w-20 text-right shrink-0">
                      <p className="text-xs font-semibold text-gray-900">{event.date}</p>
                      <p className="text-[10px] text-gray-400">{event.time}</p>
                    </div>
                    <div className="relative z-10 w-2 h-2 rounded-full bg-gray-300 mt-1.5 outline outline-4 outline-white" />
                    <div className="flex-1">
                      <p className="text-xs font-semibold text-gray-900">{event.title}</p>
                      <p className="text-[10px] text-gray-500 mt-0.5">{event.description}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              <button className="mt-6 w-full py-2 text-xs font-medium text-gray-600 bg-gray-50 rounded-lg hover:bg-gray-100">
                Afficher plus
              </button>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          <h2 className="text-sm font-semibold text-gray-900">Informations commande</h2>
          
          {/* Summary Card */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <List className="w-4 h-4 text-gray-400" />
                <span className="text-sm font-semibold text-gray-900">Sommaire</span>
              </div>
              <StatusBadge status="Traité" />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-gray-500">Date de création</span>
                <span className="text-gray-900 font-medium">{orderData.createdAt}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-gray-500">Date de livraison estimée</span>
                <span className="text-gray-900 font-medium">{orderData.estimatedDelivery}</span>
              </div>
            </div>
          </div>

          {/* Client Card */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4 text-gray-400" />
                <span className="text-sm font-semibold text-gray-900">Client</span>
              </div>
              <button className="text-gray-400 hover:text-gray-600">
                <Pencil className="w-3.5 h-3.5" />
              </button>
            </div>
            <div>
              <p className="text-xs font-semibold text-gray-900">{orderData.client.name}</p>
              <p className="text-xs text-gray-500">{orderData.client.email}</p>
              <p className="text-xs text-gray-500">{orderData.client.phone}</p>
            </div>
          </div>

          {/* Delivery Mode Card */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-6">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-gray-400" />
              <span className="text-sm font-semibold text-gray-900">Mode de livraison</span>
            </div>
            
            {orderData.deliveryMode.pickup && (
              <div className="space-y-2">
                <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider">Retrait magasin</p>
                <div>
                  <p className="text-xs font-semibold text-gray-900">{orderData.deliveryMode.pickup.store}</p>
                  <p className="text-xs text-gray-500">{orderData.deliveryMode.pickup.email} | {orderData.deliveryMode.pickup.phone}</p>
                </div>
              </div>
            )}

            {orderData.deliveryMode.home && (
              <div className="space-y-2 relative">
                <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider">Livraison à domicile</p>
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-xs font-semibold text-gray-900">{orderData.deliveryMode.home.name}</p>
                    <p className="text-xs text-gray-500">{orderData.deliveryMode.home.address}</p>
                    <p className="text-xs text-gray-500">{orderData.deliveryMode.home.zip}, {orderData.deliveryMode.home.city}</p>
                    <p className="text-xs text-gray-500">{orderData.deliveryMode.home.country}</p>
                  </div>
                </div>
              </div>
            )}

            <div className="space-y-2 relative">
              <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider">Contact de retrait</p>
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-xs font-semibold text-gray-900">{orderData.client.name}</p>
                  <p className="text-xs text-gray-500">{orderData.deliveryMode.home?.address}</p>
                  <p className="text-xs text-gray-500">{orderData.deliveryMode.home?.zip}, {orderData.deliveryMode.home?.city}</p>
                  <p className="text-xs text-gray-500">{orderData.deliveryMode.home?.country}</p>
                </div>
                <button className="text-gray-400 hover:text-gray-600">
                  <Pencil className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>

          {/* Payment Card */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-6">
            <div className="flex items-center gap-2">
              <CreditCard className="w-4 h-4 text-gray-400" />
              <span className="text-sm font-semibold text-gray-900">Paiement</span>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider">Adresse de facturation</p>
                <button className="text-gray-400 hover:text-gray-600">
                  <Pencil className="w-3.5 h-3.5" />
                </button>
              </div>
              <div>
                <p className="text-xs font-semibold text-gray-900">{orderData.payment.billingAddress.name}</p>
                <p className="text-xs text-gray-500">{orderData.payment.billingAddress.address}</p>
                <p className="text-xs text-gray-500">{orderData.payment.billingAddress.zip}, {orderData.payment.billingAddress.city}</p>
                <p className="text-xs text-gray-500">{orderData.payment.billingAddress.country}</p>
              </div>
            </div>

            <div className="space-y-3">
              <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider">Méthode de paiement</p>
              {orderData.payment.methods.map((method, idx) => (
                <div key={idx} className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <div className="p-1 bg-gray-100 rounded">
                      <CreditCard className="w-3 h-3 text-gray-500" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">{method.type}</p>
                      <p className="text-[10px] text-gray-400">**** {method.last4}</p>
                    </div>
                  </div>
                  <span className="font-medium text-gray-900">{method.amount.toFixed(2)}€</span>
                </div>
              ))}
            </div>

            <div className="pt-4 border-t border-gray-100 space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-gray-500">Sous-total</span>
                <span className="text-gray-900">{orderData.payment.subtotal.toFixed(2)}€</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-gray-500">Substitution</span>
                <span className="text-gray-900">{orderData.payment.substitutionAdjustment.toFixed(2)}€</span>
              </div>
              <div className="flex justify-between pt-2 border-t border-gray-100">
                <span className="text-sm font-bold text-gray-900">Total</span>
                <span className="text-sm font-bold text-gray-900">{orderData.payment.total.toFixed(2)}€</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
