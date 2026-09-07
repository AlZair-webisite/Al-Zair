'use client';

import {
  AlertCircle,
  Check,
  Edit2,
  Image as ImageIcon,
  Loader2,
  Plus,
  RefreshCw,
  Search,
  Tag,
  Trash2,
  UploadCloud,
  X,
} from 'lucide-react';
import Image from 'next/image';
import { useEffect, useMemo, useRef, useState } from 'react';

interface GalleryItem {
  id: string;
  image: string;
  alt: string;
  category: string;
  created_at?: string;
}

const DEFAULT_CATEGORIES = ['Dates', 'Products', 'Packaging', 'Gift Packs'];

export default function AdminGalleryPage() {
  const [images, setImages] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [error, setError] = useState('');

  // Modal State
  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<GalleryItem | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  // Form State
  const [formData, setFormData] = useState({
    image: '',
    alt: '',
    category: 'Products',
  });

  const fileInputRef = useRef<HTMLInputElement>(null);

  const fetchGallery = async (isManual = false) => {
    if (isManual) setRefreshing(true);
    else setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/admin/gallery', { cache: 'no-store' });
      const data = await res.json();
      if (res.ok && data.success) {
        setImages(data.data || []);
      } else {
        setError(data.message || 'Failed to fetch gallery images');
      }
    } catch (err: any) {
      setError(err?.message || 'Error connecting to gallery service');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchGallery();
  }, []);

  const openAddModal = () => {
    setEditingItem(null);
    setFormData({
      image: '',
      alt: '',
      category: 'Products',
    });
    setModalOpen(true);
  };

  const openEditModal = (item: GalleryItem) => {
    setEditingItem(item);
    setFormData({
      image: item.image,
      alt: item.alt,
      category: item.category || 'Products',
    });
    setModalOpen(true);
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingImage(true);
    setError('');

    try {
      const uploadData = new FormData();
      uploadData.append('file', file);

      const res = await fetch('/api/admin/upload', {
        method: 'POST',
        body: uploadData,
      });

      const data = await res.json();

      if (res.ok && data.success && data.url) {
        setFormData((prev) => ({
          ...prev,
          image: data.url,
          alt: prev.alt || file.name.replace(/\.[^/.]+$/, '').replace(/[-_]/g, ' '),
        }));
      } else {
        alert(data.message || 'Failed to upload image to Cloudinary.');
      }
    } catch (err: any) {
      alert(err?.message || 'Error uploading file.');
    } finally {
      setUploadingImage(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.image.trim()) {
      alert('Please provide or upload an image.');
      return;
    }

    setSubmitting(true);

    try {
      if (editingItem) {
        // Edit existing
        const res = await fetch('/api/admin/gallery', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            id: editingItem.id,
            image: formData.image.trim(),
            alt: formData.alt.trim() || 'Alzair Premium Dates',
            category: formData.category.trim(),
          }),
        });

        const data = await res.json();
        if (res.ok && data.success) {
          setImages((prev) =>
            prev.map((img) =>
              img.id === editingItem.id
                ? {
                    ...img,
                    image: formData.image.trim(),
                    alt: formData.alt.trim() || 'Alzair Premium Dates',
                    category: formData.category.trim(),
                  }
                : img
            )
          );
          setModalOpen(false);
        } else {
          alert(data.message || 'Failed to update image.');
        }
      } else {
        // Add new
        const res = await fetch('/api/admin/gallery', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            image: formData.image.trim(),
            alt: formData.alt.trim() || 'Alzair Premium Dates',
            category: formData.category.trim(),
          }),
        });

        const data = await res.json();
        if (res.ok && data.success && data.data) {
          setImages((prev) => [data.data, ...prev]);
          setModalOpen(false);
        } else {
          alert(data.message || 'Failed to add image.');
        }
      }
    } catch (err: any) {
      alert(err?.message || 'Error saving gallery image.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`/api/admin/gallery?id=${encodeURIComponent(id)}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        setImages((prev) => prev.filter((img) => img.id !== id));
        setDeleteConfirmId(null);
      }
    } catch (err: any) {
      alert(err?.message || 'Failed to delete image');
    }
  };

  // Categories list extracted dynamically
  const categoriesList = useMemo(() => {
    const set = new Set<string>(DEFAULT_CATEGORIES);
    images.forEach((img) => {
      if (img.category) set.add(img.category);
    });
    return Array.from(set);
  }, [images]);

  const filteredImages = useMemo(() => {
    return images.filter((img) => {
      const matchesCategory =
        selectedCategory === 'ALL' ||
        img.category?.toUpperCase() === selectedCategory.toUpperCase();

      const query = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !query ||
        img.alt.toLowerCase().includes(query) ||
        (img.category || '').toLowerCase().includes(query);

      return matchesCategory && matchesSearch;
    });
  }, [images, selectedCategory, searchQuery]);

  return (
    <div className="space-y-6 font-sans">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              Store Gallery Management
            </h1>
            <span className="rounded-full bg-[#c49a4a] px-2.5 py-0.5 text-xs font-bold text-[#12100d] shadow-sm">
              {images.length} Photos
            </span>
          </div>
          <p className="text-xs text-white/60 mt-1">
            Add, update, or remove photos displayed on the public Gallery page (
            <a href="/gallery" target="_blank" className="text-[#c49a4a] hover:underline">
              /gallery
            </a>
            ).
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => fetchGallery(true)}
            disabled={loading || refreshing}
            className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-4 py-2.5 text-xs font-semibold text-white/90 shadow-sm transition hover:bg-white/10 hover:border-[#c49a4a]/50 active:scale-95 disabled:opacity-50"
          >
            <RefreshCw size={14} className={refreshing ? 'animate-spin text-[#c49a4a]' : ''} />
            <span>Refresh</span>
          </button>

          <button
            onClick={openAddModal}
            className="inline-flex items-center gap-2 rounded-xl bg-[#c49a4a] px-4 py-2.5 text-xs font-bold text-[#12100d] shadow-md transition hover:bg-[#d6b15e] active:scale-95"
          >
            <Plus size={15} strokeWidth={2.5} />
            <span>Add Photo</span>
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 rounded-2xl border border-white/10 bg-[#14120e] p-3">
        {/* Category Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
          <button
            onClick={() => setSelectedCategory('ALL')}
            className={`rounded-lg px-3.5 py-2 text-xs font-semibold uppercase tracking-wider transition shrink-0 ${
              selectedCategory === 'ALL'
                ? 'bg-[#c49a4a] text-[#12100d] font-bold shadow-sm'
                : 'text-white/70 hover:bg-white/5 hover:text-white'
            }`}
          >
            All ({images.length})
          </button>

          {categoriesList.map((cat) => {
            const count = images.filter((img) => img.category?.toUpperCase() === cat.toUpperCase()).length;
            const isSelected = selectedCategory.toUpperCase() === cat.toUpperCase();
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`rounded-lg px-3.5 py-2 text-xs font-semibold uppercase tracking-wider transition shrink-0 ${
                  isSelected
                    ? 'bg-[#c49a4a] text-[#12100d] font-bold shadow-sm'
                    : 'text-white/70 hover:bg-white/5 hover:text-white'
                }`}
              >
                {cat} ({count})
              </button>
            );
          })}
        </div>

        {/* Search Box */}
        <div className="relative min-w-[220px] flex-1 sm:max-w-xs">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search photos..."
            className="w-full rounded-xl border border-white/10 bg-white/5 py-2 pl-9 pr-3 text-xs text-white placeholder:text-white/30 outline-none transition focus:border-[#c49a4a] focus:bg-white/10"
          />
        </div>
      </div>

      {/* Error Alert */}
      {error && (
        <div className="flex items-center justify-between rounded-xl border border-rose-500/30 bg-rose-500/10 p-4 text-xs text-rose-300">
          <div className="flex items-center gap-2">
            <AlertCircle size={16} className="text-rose-400 shrink-0" />
            <span>{error}</span>
          </div>
          <button
            onClick={() => fetchGallery()}
            className="rounded-lg bg-rose-500/20 px-3 py-1 font-semibold hover:bg-rose-500/30 text-rose-200"
          >
            Retry
          </button>
        </div>
      )}

      {/* Loading State */}
      {loading ? (
        <div className="flex flex-col items-center justify-center py-24 text-center">
          <Loader2 size={32} className="animate-spin text-[#c49a4a] mb-3" />
          <p className="text-xs text-white/60">Loading gallery photos...</p>
        </div>
      ) : filteredImages.length === 0 ? (
        /* Empty State */
        <div className="flex flex-col items-center justify-center rounded-2xl border border-white/10 bg-[#12110e] py-16 px-6 text-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white/5 text-white/30 mb-4">
            <ImageIcon size={26} />
          </div>
          <h3 className="text-sm font-bold text-white">No gallery photos found</h3>
          <p className="text-xs text-white/50 max-w-sm mt-1">
            {searchQuery
              ? `No photos matched "${searchQuery}". Try a different keyword.`
              : 'Add your first photo to showcase on the store gallery.'}
          </p>
          <button
            onClick={openAddModal}
            className="mt-4 inline-flex items-center gap-2 rounded-xl bg-[#c49a4a] px-4 py-2 text-xs font-bold text-[#12100d] shadow transition hover:bg-[#d6b15e]"
          >
            <Plus size={14} />
            <span>Add Photo</span>
          </button>
        </div>
      ) : (
        /* Gallery Photo Grid */
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {filteredImages.map((item) => (
            <div
              key={item.id}
              className="group relative flex flex-col rounded-2xl border border-white/10 bg-[#12110e] overflow-hidden shadow-lg transition duration-300 hover:border-[#c49a4a]/50 hover:shadow-[0_8px_24px_rgba(196,154,74,0.15)]"
            >
              {/* Photo Image Aspect */}
              <div className="relative aspect-square w-full bg-black/40 overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.alt}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                />

                {/* Category Badge overlay */}
                <div className="absolute top-2.5 left-2.5">
                  <span className="rounded-full bg-black/75 px-2.5 py-0.5 text-[10px] font-bold text-[#d6b15e] uppercase tracking-wider backdrop-blur-md border border-[#c49a4a]/30">
                    {item.category || 'Products'}
                  </span>
                </div>

                {/* Hover Action Overlay */}
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 p-3">
                  <button
                    onClick={() => openEditModal(item)}
                    className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/20 text-white backdrop-blur-md transition hover:bg-[#c49a4a] hover:text-[#12100d]"
                    title="Edit Photo"
                  >
                    <Edit2 size={15} />
                  </button>

                  <button
                    onClick={() => setDeleteConfirmId(item.id)}
                    className="flex h-9 w-9 items-center justify-center rounded-xl bg-rose-500/30 text-rose-300 backdrop-blur-md transition hover:bg-rose-500 hover:text-white"
                    title="Delete Photo"
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
              </div>

              {/* Caption Footer */}
              <div className="p-3">
                <p className="text-xs text-white/85 font-medium truncate" title={item.alt}>
                  {item.alt}
                </p>
              </div>

              {/* Inline Delete Confirmation */}
              {deleteConfirmId === item.id && (
                <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-black/90 p-4 text-center backdrop-blur-sm animate-fadeIn">
                  <p className="text-xs font-bold text-rose-300 mb-3">Delete this photo?</p>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="rounded-lg bg-rose-500 px-3 py-1.5 text-xs font-bold text-white shadow hover:bg-rose-600 transition"
                    >
                      Delete
                    </button>
                    <button
                      onClick={() => setDeleteConfirmId(null)}
                      className="rounded-lg bg-white/15 px-3 py-1.5 text-xs font-semibold text-white/80 hover:bg-white/25 transition"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* ================= ADD / EDIT MODAL ================= */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-md animate-fadeIn">
          <div className="relative w-full max-w-lg rounded-2xl border border-white/15 bg-[#12110e] p-6 shadow-2xl">
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div className="flex items-center gap-2.5">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#c49a4a]/20 text-[#d6b15e]">
                  <ImageIcon size={18} />
                </div>
                <h3 className="text-base font-bold text-white tracking-tight">
                  {editingItem ? 'Edit Gallery Photo' : 'Add New Gallery Photo'}
                </h3>
              </div>
              <button
                onClick={() => setModalOpen(false)}
                className="rounded-lg p-1 text-white/50 hover:bg-white/10 hover:text-white"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleFormSubmit} className="mt-5 space-y-4">
              {/* Cloudinary Upload Zone */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-white/70 mb-2">
                  Photo Image *
                </label>

                {formData.image ? (
                  <div className="space-y-2">
                    <div className="relative aspect-video w-full overflow-hidden rounded-xl border border-[#c49a4a]/40 bg-black/50">
                      <Image
                        src={formData.image}
                        alt="Preview"
                        fill
                        className="object-contain p-2"
                      />
                      <div className="absolute top-2 right-2 flex items-center gap-1.5">
                        <button
                          type="button"
                          onClick={() => fileInputRef.current?.click()}
                          disabled={uploadingImage}
                          className="rounded-lg bg-black/80 px-2.5 py-1 text-[11px] font-bold text-[#d6b15e] hover:bg-[#c49a4a] hover:text-[#12100d] transition border border-[#c49a4a]/40 backdrop-blur-md"
                          title="Upload replacement image to Cloudinary"
                        >
                          {uploadingImage ? 'Uploading...' : 'Change Image'}
                        </button>
                        <button
                          type="button"
                          onClick={() => setFormData({ ...formData, image: '' })}
                          className="rounded-full bg-black/80 p-1.5 text-rose-400 hover:bg-rose-500 hover:text-white transition"
                          title="Remove image"
                        >
                          <X size={14} />
                        </button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div
                    onClick={() => fileInputRef.current?.click()}
                    className="flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-white/20 bg-white/5 p-6 text-center transition hover:border-[#c49a4a] hover:bg-[#c49a4a]/5"
                  >
                    {uploadingImage ? (
                      <>
                        <Loader2 size={28} className="animate-spin text-[#c49a4a] mb-2" />
                        <span className="text-xs font-semibold text-white/80">
                          Uploading to Cloudinary...
                        </span>
                      </>
                    ) : (
                      <>
                        <UploadCloud size={30} className="text-[#c49a4a] mb-2" />
                        <p className="text-xs font-bold text-white">Click to upload image</p>
                        <p className="text-[11px] text-white/40 mt-0.5">
                          Stores automatically in Cloudinary (PNG, JPG, WEBP)
                        </p>
                      </>
                    )}
                  </div>
                )}

                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="hidden"
                />

                {/* Direct Image URL input fallback */}
                <div className="mt-2.5">
                  <input
                    type="text"
                    value={formData.image}
                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                    placeholder="Or paste an image URL directly"
                    className="w-full rounded-xl border border-white/10 bg-white/5 py-2 px-3 text-xs text-white placeholder:text-white/30 outline-none focus:border-[#c49a4a]"
                  />
                </div>
              </div>

              {/* Category */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-white/70 mb-1.5">
                  Gallery Category *
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-2">
                  {DEFAULT_CATEGORIES.map((cat) => (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => setFormData({ ...formData, category: cat })}
                      className={`rounded-lg py-2 text-xs font-bold transition border ${
                        formData.category.toLowerCase() === cat.toLowerCase()
                          ? 'border-[#c49a4a] bg-[#c49a4a] text-[#12100d]'
                          : 'border-white/10 bg-white/5 text-white/70 hover:bg-white/10'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
                <input
                  type="text"
                  required
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  placeholder="e.g. Products, Dates, Packaging, Gift Packs"
                  className="w-full rounded-xl border border-white/10 bg-white/5 py-2.5 px-3.5 text-xs text-white placeholder:text-white/30 outline-none focus:border-[#c49a4a]"
                />
              </div>

              {/* Alt / Caption */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-white/70 mb-1.5">
                  Caption / Alt Description *
                </label>
                <input
                  type="text"
                  required
                  value={formData.alt}
                  onChange={(e) => setFormData({ ...formData, alt: e.target.value })}
                  placeholder="e.g. Luxury Medjool Dates Gift Pack"
                  className="w-full rounded-xl border border-white/10 bg-white/5 py-2.5 px-3.5 text-xs text-white placeholder:text-white/30 outline-none focus:border-[#c49a4a]"
                />
              </div>

              {/* Modal Actions */}
              <div className="flex items-center justify-end gap-2.5 pt-4 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-xs font-semibold text-white/70 hover:bg-white/10 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting || uploadingImage || !formData.image}
                  className="inline-flex items-center gap-2 rounded-xl bg-[#c49a4a] px-5 py-2.5 text-xs font-bold text-[#12100d] shadow transition hover:bg-[#d6b15e] disabled:opacity-50"
                >
                  {submitting ? (
                    <>
                      <Loader2 size={14} className="animate-spin" />
                      <span>Saving...</span>
                    </>
                  ) : (
                    <>
                      <Check size={14} />
                      <span>{editingItem ? 'Save Changes' : 'Add to Gallery'}</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
