import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { apiService } from '../services/api';
import {
  defaultProfile,
  defaultActivities,
  defaultMilestones,
  defaultGallery,
  defaultNews,
} from '../data/defaultData';
import {
  LayoutDashboard,
  User,
  Heart,
  Compass,
  Milestone as MilestoneIcon,
  Camera,
  Newspaper,
  MessageSquare,
  LogOut,
  ExternalLink,
  Save,
  Plus,
  Trash2,
  Edit,
  Check,
  AlertCircle,
  Upload,
  Eye,
  CheckCircle2,
  GraduationCap,
  ArrowUp,
  ArrowDown,
  ShieldCheck,
  Share2,
} from 'lucide-react';

const AdminDashboard = () => {
  const { user, logout, isAuthenticated, loading: authLoading } = useAuth();
  const { lang, t } = useLanguage();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState('overview');
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState(null); // { type: 'success' | 'error', message: '' }

  // Data states
  const [profile, setProfile] = useState(defaultProfile);
  const [activities, setActivities] = useState(defaultActivities);
  const [milestones, setMilestones] = useState(defaultMilestones);
  const [gallery, setGallery] = useState(defaultGallery);
  const [news, setNews] = useState(defaultNews);
  const [messages, setMessages] = useState([]);

  // Active Profile Scope: 'gandra-venkata-ramana-reddy' | 'gandra-jyothi'
  const [selectedProfile, setSelectedProfile] = useState('gandra-venkata-ramana-reddy');

  // Form states for modals or editors
  const [editingActivity, setEditingActivity] = useState(null);
  const [editingMilestone, setEditingMilestone] = useState(null);
  const [editingNews, setEditingNews] = useState(null);
  const [editingEducation, setEditingEducation] = useState(null);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [newGalleryItem, setNewGalleryItem] = useState({
    title: { en: '', te: '' },
    category: 'Public Engagements',
    imageUrl: '',
    caption: { en: '', te: '' },
  });

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      navigate('/admin/login');
    }
  }, [isAuthenticated, authLoading, navigate]);

  const showNotification = (type, message) => {
    setNotification({ type, message });
    setTimeout(() => setNotification(null), 4000);
  };

  const loadAllData = async (profKey = selectedProfile) => {
    setLoading(true);
    try {
      const [pRes, aRes, mRes, gRes, nRes, cRes] = await Promise.all([
        apiService.getProfile().catch(() => null),
        apiService.getActivities({ status: '', profile: profKey }).catch(() => null),
        apiService.getMilestones({ profile: profKey }).catch(() => null),
        apiService.getGallery({ profile: profKey }).catch(() => null),
        apiService.getNews({ profile: profKey }).catch(() => null),
        apiService.getContactMessages({}).catch(() => null),
      ]);

      if (pRes?.data) setProfile(pRes.data);
      if (Array.isArray(aRes?.data)) setActivities(aRes.data);
      if (Array.isArray(mRes?.data)) setMilestones(mRes.data);
      if (Array.isArray(gRes?.data)) setGallery(gRes.data);
      if (Array.isArray(nRes?.data)) setNews(nRes.data);
      if (Array.isArray(cRes?.data)) setMessages(cRes.data);
    } catch (err) {
      console.error('Error loading dashboard data:', err);
      showNotification('error', 'Failed to refresh data from server');
    } finally {
      setLoading(false);
    }
  };

  const handleSelectProfile = (newProf) => {
    setSelectedProfile(newProf);
    loadAllData(newProf);
    showNotification(
      'success',
      `Switched management scope to: ${
        newProf === 'gandra-jyothi' ? 'Smt. Gandra Jyothi' : 'Sri Gandra Venkata Ramana Reddy'
      }`
    );
  };

  useEffect(() => {
    if (isAuthenticated) {
      loadAllData(selectedProfile);
    }
  }, [isAuthenticated]);

  // Profile Save
  const handleSaveProfile = async (e) => {
    e.preventDefault();
    try {
      await apiService.updateProfile(profile);
      showNotification('success', 'Profile and leadership info updated successfully');
    } catch (err) {
      showNotification('error', 'Failed to save profile changes');
    }
  };

  // Gandra Jyothi Section Save
  const handleSaveGandraJyothi = async (e) => {
    e.preventDefault();
    try {
      await apiService.updateGandraJyothi(profile.gandraJyothi);
      showNotification('success', 'Smt. Gandra Jyothi section updated successfully');
    } catch (err) {
      showNotification('error', 'Failed to save Gandra Jyothi section');
    }
  };

  // Social Media Links Handlers
  const handleSaveGvrSocial = async (e) => {
    if (e) e.preventDefault();
    try {
      await apiService.updateProfile(profile);
      showNotification('success', 'Sri GVR social media links updated successfully');
    } catch (err) {
      showNotification('error', 'Failed to save Sri GVR social links');
    }
  };

  const handleSaveJyothiSocial = async (e) => {
    if (e) e.preventDefault();
    try {
      await apiService.updateGandraJyothi(profile.gandraJyothi);
      showNotification('success', 'Smt. Gandra Jyothi social media links updated successfully');
    } catch (err) {
      showNotification('error', 'Failed to save Smt. Gandra Jyothi social links');
    }
  };

  // Activity Handlers
  const handleSaveActivity = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...editingActivity,
        profile: editingActivity.profile || selectedProfile,
      };
      if (editingActivity._id) {
        await apiService.updateActivity(editingActivity._id, payload);
        showNotification('success', 'Activity updated');
      } else {
        await apiService.createActivity(payload);
        showNotification('success', 'New public activity created');
      }
      setEditingActivity(null);
      loadAllData(selectedProfile);
    } catch (err) {
      showNotification('error', 'Failed to save activity');
    }
  };

  const handleDeleteActivity = async (id) => {
    if (!window.confirm('Are you sure you want to delete this activity?')) return;
    try {
      await apiService.deleteActivity(id);
      showNotification('success', 'Activity deleted');
      loadAllData(selectedProfile);
    } catch (err) {
      showNotification('error', 'Failed to delete activity');
    }
  };

  // Milestone Handlers
  const handleSaveMilestone = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...editingMilestone,
        profile: editingMilestone.profile || selectedProfile,
      };
      if (editingMilestone._id) {
        await apiService.updateMilestone(editingMilestone._id, payload);
        showNotification('success', 'Milestone updated');
      } else {
        await apiService.createMilestone(payload);
        showNotification('success', 'Milestone added');
      }
      setEditingMilestone(null);
      loadAllData(selectedProfile);
    } catch (err) {
      showNotification('error', 'Failed to save milestone');
    }
  };

  const handleDeleteMilestone = async (id) => {
    if (!window.confirm('Delete this milestone?')) return;
    try {
      await apiService.deleteMilestone(id);
      showNotification('success', 'Milestone deleted');
      loadAllData(selectedProfile);
    } catch (err) {
      showNotification('error', 'Failed to delete milestone');
    }
  };

  // Gallery File Upload
  const handleImageFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('image', file);

    setUploadingImage(true);
    try {
      const res = await apiService.uploadImage(formData);
      setNewGalleryItem((prev) => ({ ...prev, imageUrl: res.url }));
      showNotification('success', 'Image file uploaded to server');
    } catch (err) {
      showNotification('error', 'Image upload failed. Ensure format is PNG, JPG, or WEBP.');
    } finally {
      setUploadingImage(false);
    }
  };

  const handleJyothiPhotoUpload = async (e, photoKey) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('image', file);

    setUploadingImage(true);
    try {
      const res = await apiService.uploadImage(formData);
      setProfile((prev) => ({
        ...prev,
        gandraJyothi: {
          ...prev.gandraJyothi,
          [photoKey]: res.url,
        },
      }));
      showNotification('success', 'Photograph uploaded successfully');
    } catch (err) {
      showNotification('error', 'Image upload failed. Ensure format is PNG, JPG, or WEBP.');
    } finally {
      setUploadingImage(false);
    }
  };

  const handleActivityImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('image', file);

    setUploadingImage(true);
    try {
      const res = await apiService.uploadImage(formData);
      setEditingActivity((prev) => ({ ...prev, imageUrl: res.url }));
      showNotification('success', 'Activity cover image uploaded');
    } catch (err) {
      showNotification('error', 'Activity image upload failed.');
    } finally {
      setUploadingImage(false);
    }
  };

  const handleNewsImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('image', file);

    setUploadingImage(true);
    try {
      const res = await apiService.uploadImage(formData);
      setEditingNews((prev) => ({ ...prev, imageUrl: res.url }));
      showNotification('success', 'Statement press image uploaded');
    } catch (err) {
      showNotification('error', 'News image upload failed.');
    } finally {
      setUploadingImage(false);
    }
  };

  const handleCreateGalleryItem = async (e) => {
    e.preventDefault();
    if (!newGalleryItem.imageUrl) {
      showNotification('error', 'Please upload or specify an image URL');
      return;
    }
    try {
      const payload = {
        ...newGalleryItem,
        profile: newGalleryItem.profile || selectedProfile,
      };
      await apiService.createGalleryItem(payload);
      showNotification('success', 'Photo added to official visual archive');
      setNewGalleryItem({
        title: { en: '', te: '' },
        category: 'Public Engagements',
        imageUrl: '',
        caption: { en: '', te: '' },
      });
      loadAllData(selectedProfile);
    } catch (err) {
      showNotification('error', 'Failed to add gallery item');
    }
  };

  const handleDeleteGallery = async (id) => {
    if (!window.confirm('Remove this photo from gallery?')) return;
    try {
      await apiService.deleteGalleryItem(id);
      showNotification('success', 'Photo removed');
      loadAllData(selectedProfile);
    } catch (err) {
      showNotification('error', 'Failed to delete photo');
    }
  };

  // News Handlers
  const handleSaveNews = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...editingNews,
        profile: editingNews.profile || selectedProfile,
      };
      if (editingNews._id) {
        await apiService.updateNews(editingNews._id, payload);
        showNotification('success', 'Statement updated');
      } else {
        await apiService.createNews(payload);
        showNotification('success', 'News statement published');
      }
      setEditingNews(null);
      loadAllData(selectedProfile);
    } catch (err) {
      showNotification('error', 'Failed to save news');
    }
  };

  const handleDeleteNews = async (id) => {
    if (!window.confirm('Delete this statement?')) return;
    try {
      await apiService.deleteNews(id);
      showNotification('success', 'Statement deleted');
      loadAllData(selectedProfile);
    } catch (err) {
      showNotification('error', 'Failed to delete news');
    }
  };

  // Citizen Message Status
  const handleUpdateMessageStatus = async (id, status) => {
    try {
      await apiService.updateContactStatus(id, { status });
      showNotification('success', `Grievance status updated to "${status}"`);
      loadAllData();
    } catch (err) {
      showNotification('error', 'Failed to update message status');
    }
  };

  const handleDeleteMessage = async (id) => {
    if (!window.confirm('Delete this grievance entry?')) return;
    try {
      await apiService.deleteContactMessage(id);
      showNotification('success', 'Message deleted');
      loadAllData();
    } catch (err) {
      showNotification('error', 'Failed to delete message');
    }
  };

  // Education Handlers
  const handleSaveEducation = async (e) => {
    e.preventDefault();
    try {
      const currentList = profile.educationalQualifications ? [...profile.educationalQualifications] : [];
      let updatedList;
      if (editingEducation.index !== undefined && editingEducation.index !== null) {
        currentList[editingEducation.index] = {
          ...editingEducation.item,
          order: editingEducation.item.order !== undefined ? Number(editingEducation.item.order) : editingEducation.index + 1,
        };
        updatedList = currentList;
      } else {
        const newItem = {
          ...editingEducation.item,
          order: currentList.length + 1,
        };
        updatedList = [...currentList, newItem];
      }

      await apiService.updateEducation({ educationalQualifications: updatedList });
      setProfile((prev) => ({ ...prev, educationalQualifications: updatedList }));
      setEditingEducation(null);
      showNotification('success', 'Educational qualification entry saved successfully');
    } catch (err) {
      showNotification('error', 'Failed to save educational qualification');
    }
  };

  const handleDeleteEducation = async (indexToDelete) => {
    if (!window.confirm('Are you sure you want to delete this educational entry?')) return;
    try {
      const updatedList = (profile.educationalQualifications || []).filter((_, idx) => idx !== indexToDelete);
      await apiService.updateEducation({ educationalQualifications: updatedList });
      setProfile((prev) => ({ ...prev, educationalQualifications: updatedList }));
      showNotification('success', 'Educational entry removed');
    } catch (err) {
      showNotification('error', 'Failed to delete educational entry');
    }
  };

  const handleMoveEducation = async (index, direction) => {
    const list = [...(profile.educationalQualifications || [])];
    const targetIndex = index + direction;
    if (targetIndex < 0 || targetIndex >= list.length) return;

    const temp = list[index];
    list[index] = list[targetIndex];
    list[targetIndex] = temp;

    list.forEach((item, idx) => {
      item.order = idx + 1;
    });

    try {
      await apiService.updateEducation({ educationalQualifications: list });
      setProfile((prev) => ({ ...prev, educationalQualifications: list }));
      showNotification('success', 'Display order updated');
    } catch (err) {
      showNotification('error', 'Failed to update order');
    }
  };

  const handleSaveEducationNotice = async (e) => {
    e.preventDefault();
    try {
      await apiService.updateEducation({
        educationVerificationStatus: profile.educationVerificationStatus,
      });
      showNotification('success', 'Verification notice saved successfully');
    } catch (err) {
      showNotification('error', 'Failed to save verification notice');
    }
  };

  if (authLoading || !profile) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <p style={{ color: 'var(--text-secondary)' }}>Loading constituency dashboard...</p>
      </div>
    );
  }

  const tabs = [
    { id: 'overview', label: t.admin.tabs.overview, icon: <LayoutDashboard size={18} /> },
    { id: 'profile', label: t.admin.tabs.profile, icon: <User size={18} /> },
    { id: 'education', label: t.admin.tabs.education || 'Educational Qualifications', icon: <GraduationCap size={18} /> },
    { id: 'gandraJyothi', label: t.admin.tabs.gandraJyothi, icon: <Heart size={18} /> },
    { id: 'socialMedia', label: t.admin.tabs.socialMedia || 'Social Media & Connect', icon: <Share2 size={18} /> },
    { id: 'activities', label: t.admin.tabs.activities, icon: <Compass size={18} /> },
    { id: 'milestones', label: t.admin.tabs.milestones, icon: <MilestoneIcon size={18} /> },
    { id: 'gallery', label: t.admin.tabs.gallery, icon: <Camera size={18} /> },
    { id: 'news', label: t.admin.tabs.news, icon: <Newspaper size={18} /> },
    { id: 'messages', label: `${t.admin.tabs.messages} (${messages.length})`, icon: <MessageSquare size={18} /> },
  ];

  return (
    <div style={{ minHeight: '100vh', display: 'flex', backgroundColor: 'var(--bg-secondary)' }}>
      {/* Sidebar */}
      <aside
        style={{
          width: '280px',
          backgroundColor: 'var(--bg-navy-dark)',
          color: '#FFFFFF',
          display: 'flex',
          flexDirection: 'column',
          flexShrink: 0,
        }}
        className="admin-sidebar"
      >
        {/* Brand */}
        <div style={{ padding: '24px 20px', borderBottom: '1px solid rgba(255, 255, 255, 0.1)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                backgroundColor: 'var(--accent-navy)',
                border: '2px solid var(--accent-gold)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 700,
                fontSize: '0.8rem',
              }}
            >
              GVR
            </div>
            <div>
              <div style={{ fontSize: '0.92rem', fontWeight: 700, color: '#FFFFFF' }}>Gandra Reddy Office</div>
              <div style={{ fontSize: '0.72rem', color: 'var(--accent-gold)' }}>Management Portal</div>
            </div>
          </div>
        </div>

        {/* Profile Scope Selector */}
        <div style={{ padding: '14px 16px', borderBottom: '1px solid rgba(255, 255, 255, 0.1)', backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>
          <div style={{ fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--accent-gold)', marginBottom: '8px', fontWeight: 700 }}>
            Active Profile Scope:
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px' }}>
            <button
              type="button"
              onClick={() => handleSelectProfile('gandra-venkata-ramana-reddy')}
              style={{
                padding: '7px 8px',
                fontSize: '0.74rem',
                fontWeight: 700,
                borderRadius: 'var(--radius-xs)',
                border: selectedProfile === 'gandra-venkata-ramana-reddy' ? '1px solid var(--accent-gold)' : '1px solid rgba(255,255,255,0.15)',
                backgroundColor: selectedProfile === 'gandra-venkata-ramana-reddy' ? 'var(--accent-navy)' : 'transparent',
                color: selectedProfile === 'gandra-venkata-ramana-reddy' ? '#FFFFFF' : 'rgba(255,255,255,0.7)',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
            >
              Sri GVR
            </button>
            <button
              type="button"
              onClick={() => handleSelectProfile('gandra-jyothi')}
              style={{
                padding: '7px 8px',
                fontSize: '0.74rem',
                fontWeight: 700,
                borderRadius: 'var(--radius-xs)',
                border: selectedProfile === 'gandra-jyothi' ? '1px solid var(--accent-gold)' : '1px solid rgba(255,255,255,0.15)',
                backgroundColor: selectedProfile === 'gandra-jyothi' ? 'var(--accent-navy)' : 'transparent',
                color: selectedProfile === 'gandra-jyothi' ? '#FFFFFF' : 'rgba(255,255,255,0.7)',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
            >
              Smt. Jyothi
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <nav style={{ padding: '16px 12px', display: 'flex', flexDirection: 'column', gap: '4px', flex: 1, overflowY: 'auto' }}>
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '10px 14px',
                borderRadius: 'var(--radius-xs)',
                fontSize: '0.88rem',
                fontWeight: 600,
                color: activeTab === tab.id ? '#FFFFFF' : 'var(--text-light-muted)',
                backgroundColor: activeTab === tab.id ? 'var(--accent-navy)' : 'transparent',
                borderLeft: activeTab === tab.id ? '3px solid var(--accent-gold)' : '3px solid transparent',
                textAlign: 'left',
                width: '100%',
                transition: 'all 0.2s ease',
              }}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          ))}
        </nav>

        {/* Bottom User Actions */}
        <div style={{ padding: '16px', borderTop: '1px solid rgba(255, 255, 255, 0.1)', display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <Link
            to="/"
            target="_blank"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
              padding: '8px',
              fontSize: '0.82rem',
              fontWeight: 600,
              color: 'var(--accent-gold)',
              border: '1px solid var(--accent-gold)',
              borderRadius: 'var(--radius-xs)',
            }}
          >
            <ExternalLink size={14} />
            <span>{t.admin.backToSite}</span>
          </Link>

          <button
            onClick={() => {
              logout();
              navigate('/admin/login');
            }}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
              padding: '8px',
              fontSize: '0.82rem',
              fontWeight: 600,
              color: '#FF8A8A',
              border: '1px solid rgba(255, 138, 138, 0.4)',
              borderRadius: 'var(--radius-xs)',
              marginTop: '4px',
            }}
          >
            <LogOut size={14} />
            <span>{t.admin.logout}</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main style={{ flex: 1, padding: '32px', overflowY: 'auto' }}>
        {/* Profile Scope Indicator Banner */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            backgroundColor: selectedProfile === 'gandra-jyothi' ? 'rgba(30, 107, 74, 0.08)' : 'rgba(10, 25, 47, 0.05)',
            border: `1px solid ${selectedProfile === 'gandra-jyothi' ? 'var(--accent-green)' : 'var(--accent-gold)'}`,
            padding: '12px 18px',
            borderRadius: 'var(--radius-xs)',
            marginBottom: '20px',
            flexWrap: 'wrap',
            gap: '12px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span
              style={{
                width: '10px',
                height: '10px',
                borderRadius: '50%',
                backgroundColor: selectedProfile === 'gandra-jyothi' ? 'var(--accent-green)' : 'var(--accent-saffron)',
                display: 'inline-block',
              }}
            />
            <span style={{ fontSize: '0.86rem', color: 'var(--text-secondary)' }}>
              Active Management Profile:
            </span>
            <strong style={{ fontSize: '0.94rem', color: 'var(--accent-navy)' }}>
              {selectedProfile === 'gandra-jyothi' ? 'Smt. Gandra Jyothi' : 'Sri Gandra Venkata Ramana Reddy'}
            </strong>
          </div>
          <div style={{ display: 'flex', gap: '8px' }}>
            <button
              type="button"
              onClick={() => handleSelectProfile('gandra-venkata-ramana-reddy')}
              style={{
                padding: '6px 12px',
                fontSize: '0.78rem',
                fontWeight: 700,
                borderRadius: 'var(--radius-xs)',
                border: '1px solid var(--border-medium)',
                backgroundColor: selectedProfile === 'gandra-venkata-ramana-reddy' ? 'var(--accent-navy)' : 'var(--bg-surface)',
                color: selectedProfile === 'gandra-venkata-ramana-reddy' ? '#FFFFFF' : 'var(--text-primary)',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
            >
              Sri GVR Profile
            </button>
            <button
              type="button"
              onClick={() => handleSelectProfile('gandra-jyothi')}
              style={{
                padding: '6px 12px',
                fontSize: '0.78rem',
                fontWeight: 700,
                borderRadius: 'var(--radius-xs)',
                border: '1px solid var(--border-medium)',
                backgroundColor: selectedProfile === 'gandra-jyothi' ? 'var(--accent-green)' : 'var(--bg-surface)',
                color: selectedProfile === 'gandra-jyothi' ? '#FFFFFF' : 'var(--text-primary)',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
            >
              Smt. Gandra Jyothi Profile
            </button>
          </div>
        </div>

        {/* Top bar notification */}
        {notification && (
          <div
            style={{
              padding: '12px 18px',
              borderRadius: 'var(--radius-xs)',
              marginBottom: '20px',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              backgroundColor: notification.type === 'success' ? 'rgba(19, 78, 53, 0.15)' : 'rgba(217, 93, 30, 0.15)',
              border: `1px solid ${notification.type === 'success' ? 'var(--accent-green)' : 'var(--accent-saffron)'}`,
              color: notification.type === 'success' ? 'var(--accent-green)' : 'var(--accent-saffron)',
              fontWeight: 600,
              fontSize: '0.9rem',
            }}
          >
            {notification.type === 'success' ? <CheckCircle2 size={18} /> : <AlertCircle size={18} />}
            <span>{notification.message}</span>
          </div>
        )}

        {/* 1. OVERVIEW TAB */}
        {activeTab === 'overview' && (
          <div>
            <h1 style={{ fontSize: '1.65rem', fontWeight: 700, color: 'var(--accent-navy)', marginBottom: '6px' }}>
              Welcome, {user?.name || 'Administrator'}
            </h1>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '28px' }}>
              Official administrative console for Sri Gandra Venkata Ramana Reddy’s political portfolio.
            </p>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                gap: '20px',
                marginBottom: '36px',
              }}
            >
              <div style={{ backgroundColor: '#FFFFFF', padding: '24px', borderRadius: 'var(--radius-xs)', border: '1px solid var(--border-subtle)', boxShadow: 'var(--shadow-sm)' }}>
                <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>Public Activities</div>
                <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--accent-navy)', marginTop: '6px' }}>{activities.length}</div>
              </div>
              <div style={{ backgroundColor: '#FFFFFF', padding: '24px', borderRadius: 'var(--radius-xs)', border: '1px solid var(--border-subtle)', boxShadow: 'var(--shadow-sm)' }}>
                <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>Confirmed Milestones</div>
                <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--accent-green)', marginTop: '6px' }}>{milestones.length}</div>
              </div>
              <div style={{ backgroundColor: '#FFFFFF', padding: '24px', borderRadius: 'var(--radius-xs)', border: '1px solid var(--border-subtle)', boxShadow: 'var(--shadow-sm)' }}>
                <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>Visual Archive Photos</div>
                <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--accent-saffron)', marginTop: '6px' }}>{gallery.length}</div>
              </div>
              <div style={{ backgroundColor: '#FFFFFF', padding: '24px', borderRadius: 'var(--radius-xs)', border: '1px solid var(--border-subtle)', boxShadow: 'var(--shadow-sm)' }}>
                <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>Citizen Inquiries</div>
                <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--accent-gold-dark)', marginTop: '6px' }}>{messages.length}</div>
              </div>
            </div>

            {/* Recent Messages list */}
            <div style={{ backgroundColor: '#FFFFFF', padding: '28px', borderRadius: 'var(--radius-xs)', border: '1px solid var(--border-subtle)' }}>
              <h2 style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--accent-navy)', marginBottom: '16px' }}>
                Latest Citizen Grievances / Submissions
              </h2>
              {messages.length === 0 ? (
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>No citizen messages received yet.</p>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {messages.slice(0, 5).map((msg) => (
                    <div
                      key={msg._id}
                      style={{
                        padding: '14px',
                        backgroundColor: 'var(--bg-secondary)',
                        borderRadius: 'var(--radius-xs)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        flexWrap: 'wrap',
                        gap: '10px',
                      }}
                    >
                      <div>
                        <div style={{ fontWeight: 700, color: 'var(--accent-navy)', fontSize: '0.92rem' }}>
                          {msg.fullName} ({msg.phone})
                        </div>
                        <div style={{ fontSize: '0.84rem', color: 'var(--text-secondary)' }}>{msg.subject}</div>
                      </div>
                      <span
                        style={{
                          fontSize: '0.75rem',
                          fontWeight: 700,
                          padding: '3px 8px',
                          borderRadius: 'var(--radius-xs)',
                          backgroundColor: msg.status === 'Resolved' ? 'rgba(19, 78, 53, 0.15)' : 'rgba(217, 93, 30, 0.15)',
                          color: msg.status === 'Resolved' ? 'var(--accent-green)' : 'var(--accent-saffron)',
                        }}
                      >
                        {msg.status}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* 2. PROFILE & BIO TAB */}
        {activeTab === 'profile' && (
          <div style={{ backgroundColor: '#FFFFFF', padding: '32px', borderRadius: 'var(--radius-xs)', border: '1px solid var(--border-subtle)' }}>
            <h1 style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--accent-navy)', marginBottom: '20px' }}>
              Edit Leader Biography & Positions (Bilingual)
            </h1>

            <form onSubmit={handleSaveProfile} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, marginBottom: '6px' }}>Full Name (English)</label>
                  <input
                    type="text"
                    value={profile.fullName?.en || ''}
                    onChange={(e) => setProfile({ ...profile, fullName: { ...profile.fullName, en: e.target.value } })}
                    style={{ width: '100%', padding: '10px', border: '1px solid var(--border-medium)', borderRadius: 'var(--radius-xs)' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, marginBottom: '6px' }}>పూర్తి పేరు (తెలుగు)</label>
                  <input
                    type="text"
                    value={profile.fullName?.te || ''}
                    onChange={(e) => setProfile({ ...profile, fullName: { ...profile.fullName, te: e.target.value } })}
                    style={{ width: '100%', padding: '10px', border: '1px solid var(--border-medium)', borderRadius: 'var(--radius-xs)', fontFamily: 'var(--font-telugu)' }}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, marginBottom: '6px' }}>Designation (English)</label>
                  <input
                    type="text"
                    value={profile.designation?.en || ''}
                    onChange={(e) => setProfile({ ...profile, designation: { ...profile.designation, en: e.target.value } })}
                    style={{ width: '100%', padding: '10px', border: '1px solid var(--border-medium)', borderRadius: 'var(--radius-xs)' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, marginBottom: '6px' }}>పదవి వివరాలు (తెలుగు)</label>
                  <input
                    type="text"
                    value={profile.designation?.te || ''}
                    onChange={(e) => setProfile({ ...profile, designation: { ...profile.designation, te: e.target.value } })}
                    style={{ width: '100%', padding: '10px', border: '1px solid var(--border-medium)', borderRadius: 'var(--radius-xs)', fontFamily: 'var(--font-telugu)' }}
                  />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, marginBottom: '6px' }}>Dignified Hero Message (English)</label>
                <textarea
                  rows={3}
                  value={profile.heroDignifiedMessage?.en || ''}
                  onChange={(e) => setProfile({ ...profile, heroDignifiedMessage: { ...profile.heroDignifiedMessage, en: e.target.value } })}
                  style={{ width: '100%', padding: '10px', border: '1px solid var(--border-medium)', borderRadius: 'var(--radius-xs)' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, marginBottom: '6px' }}>ప్రజా సందేశం (తెలుగు)</label>
                <textarea
                  rows={3}
                  value={profile.heroDignifiedMessage?.te || ''}
                  onChange={(e) => setProfile({ ...profile, heroDignifiedMessage: { ...profile.heroDignifiedMessage, te: e.target.value } })}
                  style={{ width: '100%', padding: '10px', border: '1px solid var(--border-medium)', borderRadius: 'var(--radius-xs)', fontFamily: 'var(--font-telugu)' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, marginBottom: '6px' }}>Full Biography (English)</label>
                <textarea
                  rows={5}
                  value={profile.biography?.en || ''}
                  onChange={(e) => setProfile({ ...profile, biography: { ...profile.biography, en: e.target.value } })}
                  style={{ width: '100%', padding: '10px', border: '1px solid var(--border-medium)', borderRadius: 'var(--radius-xs)' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, marginBottom: '6px' }}>జీవిత విశేషాలు (తెలుగు)</label>
                <textarea
                  rows={5}
                  value={profile.biography?.te || ''}
                  onChange={(e) => setProfile({ ...profile, biography: { ...profile.biography, te: e.target.value } })}
                  style={{ width: '100%', padding: '10px', border: '1px solid var(--border-medium)', borderRadius: 'var(--radius-xs)', fontFamily: 'var(--font-telugu)' }}
                />
              </div>

              <button type="submit" className="btn btn-primary" style={{ alignSelf: 'flex-start' }}>
                <Save size={16} />
                <span>Save Profile Changes</span>
              </button>
            </form>
          </div>
        )}

        {/* 2.5. EDUCATIONAL QUALIFICATIONS TAB */}
        {activeTab === 'education' && (
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px', flexWrap: 'wrap', gap: '12px' }}>
              <div>
                <h1 style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--accent-navy)', marginBottom: '4px' }}>
                  Educational Qualifications (విద్యార్హతలు)
                </h1>
                <p style={{ fontSize: '0.86rem', color: 'var(--text-secondary)' }}>
                  Manage verified academic history and credentials. Only fields with verified data will be displayed publicly.
                </p>
              </div>

              <button
                onClick={() =>
                  setEditingEducation({
                    item: {
                      qualification: { en: '', te: '' },
                      institution: { en: '', te: '' },
                      fieldOfStudy: { en: '', te: '' },
                      yearOfCompletion: '',
                      notes: { en: '', te: '' },
                      isVerified: true,
                    },
                  })
                }
                className="btn btn-primary btn-sm"
              >
                <Plus size={16} />
                <span>Add Qualification</span>
              </button>
            </div>

            {/* Verification Notice Settings Card */}
            <div
              style={{
                backgroundColor: '#FFFFFF',
                padding: '24px',
                borderRadius: 'var(--radius-xs)',
                border: '1px solid var(--border-subtle)',
                marginBottom: '28px',
                boxShadow: 'var(--shadow-sm)',
              }}
            >
              <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--accent-navy)', marginBottom: '8px' }}>
                Pending Verification Notice Configuration
              </h3>
              <p style={{ fontSize: '0.84rem', color: 'var(--text-secondary)', marginBottom: '16px' }}>
                This message is shown to public visitors whenever verified educational records are pending or unavailable.
              </p>

              <form onSubmit={handleSaveEducationNotice} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }} className="form-two-col">
                  <div>
                    <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, marginBottom: '4px' }}>
                      Notice Message (English)
                    </label>
                    <input
                      type="text"
                      value={profile.educationVerificationStatus?.noticeMessage?.en || 'Educational details will be updated after verification'}
                      onChange={(e) =>
                        setProfile({
                          ...profile,
                          educationVerificationStatus: {
                            ...profile.educationVerificationStatus,
                            noticeMessage: {
                              ...profile.educationVerificationStatus?.noticeMessage,
                              en: e.target.value,
                            },
                          },
                        })
                      }
                      style={{ width: '100%', padding: '9px 12px', border: '1px solid var(--border-medium)', borderRadius: 'var(--radius-xs)' }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, marginBottom: '4px' }}>
                      నోటీస్ సందేశం (తెలుగు)
                    </label>
                    <input
                      type="text"
                      value={profile.educationVerificationStatus?.noticeMessage?.te || 'విద్యార్హతల వివరాలు ధృవీకరించిన తర్వాత నవీకరించబడతాయి'}
                      onChange={(e) =>
                        setProfile({
                          ...profile,
                          educationVerificationStatus: {
                            ...profile.educationVerificationStatus,
                            noticeMessage: {
                              ...profile.educationVerificationStatus?.noticeMessage,
                              te: e.target.value,
                            },
                          },
                        })
                      }
                      style={{ width: '100%', padding: '9px 12px', border: '1px solid var(--border-medium)', borderRadius: 'var(--radius-xs)', fontFamily: 'var(--font-telugu)' }}
                    />
                  </div>
                </div>

                <button type="submit" className="btn btn-outline btn-sm" style={{ alignSelf: 'flex-start' }}>
                  <Save size={14} />
                  <span>Save Notice Settings</span>
                </button>
              </form>
            </div>

            {/* Add / Edit Qualification Form Modal */}
            {editingEducation && (
              <div
                style={{
                  backgroundColor: '#FFFFFF',
                  padding: '28px',
                  borderRadius: 'var(--radius-xs)',
                  border: '2px solid var(--accent-navy)',
                  marginBottom: '28px',
                  boxShadow: 'var(--shadow-md)',
                }}
              >
                <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--accent-navy)', marginBottom: '18px' }}>
                  {editingEducation.index !== undefined ? 'Edit Qualification Entry' : 'Add Verified Educational Qualification'}
                </h3>

                <form onSubmit={handleSaveEducation} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }} className="form-two-col">
                    <div>
                      <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, marginBottom: '4px' }}>
                        Qualification Title (English) *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Matriculation (SSC), Higher Secondary, Bachelor's..."
                        value={editingEducation.item.qualification?.en || ''}
                        onChange={(e) =>
                          setEditingEducation({
                            ...editingEducation,
                            item: {
                              ...editingEducation.item,
                              qualification: { ...editingEducation.item.qualification, en: e.target.value },
                            },
                          })
                        }
                        style={{ width: '100%', padding: '9px 12px', border: '1px solid var(--border-medium)', borderRadius: 'var(--radius-xs)' }}
                      />
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, marginBottom: '4px' }}>
                        విద్యార్హత పేరు (తెలుగు) *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="ఉదా: పదవ తరగతి (ఎస్.ఎస్.సి), ఇంటర్మీడియట్, డిగ్రీ..."
                        value={editingEducation.item.qualification?.te || ''}
                        onChange={(e) =>
                          setEditingEducation({
                            ...editingEducation,
                            item: {
                              ...editingEducation.item,
                              qualification: { ...editingEducation.item.qualification, te: e.target.value },
                            },
                          })
                        }
                        style={{ width: '100%', padding: '9px 12px', border: '1px solid var(--border-medium)', borderRadius: 'var(--radius-xs)', fontFamily: 'var(--font-telugu)' }}
                      />
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }} className="form-two-col">
                    <div>
                      <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, marginBottom: '4px' }}>
                        Institution / School / College (English)
                      </label>
                      <input
                        type="text"
                        placeholder="Leave blank if unverified"
                        value={editingEducation.item.institution?.en || ''}
                        onChange={(e) =>
                          setEditingEducation({
                            ...editingEducation,
                            item: {
                              ...editingEducation.item,
                              institution: { ...editingEducation.item.institution, en: e.target.value },
                            },
                          })
                        }
                        style={{ width: '100%', padding: '9px 12px', border: '1px solid var(--border-medium)', borderRadius: 'var(--radius-xs)' }}
                      />
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, marginBottom: '4px' }}>
                        విద్యా సంస్థ / పాఠశాల / కళాశాల (తెలుగు)
                      </label>
                      <input
                        type="text"
                        placeholder="ధృవీకరణ లేకుంటే ఖాళీగా ఉంచండి"
                        value={editingEducation.item.institution?.te || ''}
                        onChange={(e) =>
                          setEditingEducation({
                            ...editingEducation,
                            item: {
                              ...editingEducation.item,
                              institution: { ...editingEducation.item.institution, te: e.target.value },
                            },
                          })
                        }
                        style={{ width: '100%', padding: '9px 12px', border: '1px solid var(--border-medium)', borderRadius: 'var(--radius-xs)', fontFamily: 'var(--font-telugu)' }}
                      />
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px' }} className="form-three-col">
                    <div>
                      <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, marginBottom: '4px' }}>
                        Field of Study (English)
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. General, Arts, Science..."
                        value={editingEducation.item.fieldOfStudy?.en || ''}
                        onChange={(e) =>
                          setEditingEducation({
                            ...editingEducation,
                            item: {
                              ...editingEducation.item,
                              fieldOfStudy: { ...editingEducation.item.fieldOfStudy, en: e.target.value },
                            },
                          })
                        }
                        style={{ width: '100%', padding: '9px 12px', border: '1px solid var(--border-medium)', borderRadius: 'var(--radius-xs)' }}
                      />
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, marginBottom: '4px' }}>
                        అధ్యయన రంగం (తెలుగు)
                      </label>
                      <input
                        type="text"
                        placeholder="ఉదా: జనరల్, ఆర్ట్స్, సైన్స్..."
                        value={editingEducation.item.fieldOfStudy?.te || ''}
                        onChange={(e) =>
                          setEditingEducation({
                            ...editingEducation,
                            item: {
                              ...editingEducation.item,
                              fieldOfStudy: { ...editingEducation.item.fieldOfStudy, te: e.target.value },
                            },
                          })
                        }
                        style={{ width: '100%', padding: '9px 12px', border: '1px solid var(--border-medium)', borderRadius: 'var(--radius-xs)', fontFamily: 'var(--font-telugu)' }}
                      />
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, marginBottom: '4px' }}>
                        Year of Completion
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. 1975 (or leave blank)"
                        value={editingEducation.item.yearOfCompletion || ''}
                        onChange={(e) =>
                          setEditingEducation({
                            ...editingEducation,
                            item: {
                              ...editingEducation.item,
                              yearOfCompletion: e.target.value,
                            },
                          })
                        }
                        style={{ width: '100%', padding: '9px 12px', border: '1px solid var(--border-medium)', borderRadius: 'var(--radius-xs)' }}
                      />
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <input
                      type="checkbox"
                      id="eduVerifiedCheck"
                      checked={editingEducation.item.isVerified !== false}
                      onChange={(e) =>
                        setEditingEducation({
                          ...editingEducation,
                          item: {
                            ...editingEducation.item,
                            isVerified: e.target.checked,
                          },
                        })
                      }
                    />
                    <label htmlFor="eduVerifiedCheck" style={{ fontSize: '0.86rem', fontWeight: 600 }}>
                      Mark as Officially Verified (Display publicly on website)
                    </label>
                  </div>

                  <div style={{ display: 'flex', gap: '10px', marginTop: '6px' }}>
                    <button type="submit" className="btn btn-primary btn-sm">
                      <Save size={14} />
                      <span>Save Qualification</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setEditingEducation(null)}
                      className="btn btn-outline btn-sm"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* List of Current Qualifications */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {(!profile.educationalQualifications || profile.educationalQualifications.length === 0) ? (
                <div
                  style={{
                    backgroundColor: '#FFFFFF',
                    padding: '36px',
                    borderRadius: 'var(--radius-xs)',
                    border: '1px solid var(--border-subtle)',
                    textAlign: 'center',
                    color: 'var(--text-muted)',
                  }}
                >
                  <GraduationCap size={36} color="var(--accent-gold-dark)" style={{ margin: '0 auto 12px' }} />
                  <p style={{ fontWeight: 600, color: 'var(--text-primary)', marginBottom: '4px' }}>
                    No educational entries added yet.
                  </p>
                  <p style={{ fontSize: '0.85rem' }}>
                    The website is currently displaying the official neutral verification notice to public visitors. Click "Add Qualification" above to add verified degrees or credentials.
                  </p>
                </div>
              ) : (
                profile.educationalQualifications.map((item, idx) => (
                  <div
                    key={item._id || idx}
                    style={{
                      backgroundColor: '#FFFFFF',
                      padding: '20px 24px',
                      borderRadius: 'var(--radius-xs)',
                      border: '1px solid var(--border-subtle)',
                      boxShadow: 'var(--shadow-sm)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      flexWrap: 'wrap',
                      gap: '16px',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '14px' }}>
                      <div
                        style={{
                          width: '36px',
                          height: '36px',
                          borderRadius: 'var(--radius-xs)',
                          backgroundColor: 'rgba(11, 37, 69, 0.06)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: 'var(--accent-navy)',
                          fontWeight: 700,
                          fontSize: '0.85rem',
                          flexShrink: 0,
                        }}
                      >
                        {idx + 1}
                      </div>

                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                          <span style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--accent-navy)' }}>
                            {item.qualification?.en || item.qualification?.te}
                          </span>
                          {item.qualification?.te && item.qualification?.en && (
                            <span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', fontFamily: 'var(--font-telugu)' }}>
                              ({item.qualification.te})
                            </span>
                          )}

                          <span
                            style={{
                              fontSize: '0.72rem',
                              fontWeight: 700,
                              padding: '2px 8px',
                              borderRadius: 'var(--radius-xs)',
                              backgroundColor: item.isVerified !== false ? 'rgba(19, 78, 53, 0.1)' : 'rgba(217, 93, 30, 0.1)',
                              color: item.isVerified !== false ? 'var(--accent-green)' : 'var(--accent-saffron)',
                            }}
                          >
                            {item.isVerified !== false ? 'Verified' : 'Pending'}
                          </span>
                        </div>

                        <div style={{ fontSize: '0.84rem', color: 'var(--text-muted)', marginTop: '4px', display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
                          {item.institution?.en && (
                            <span>
                              <strong>Institution:</strong> {item.institution.en}
                            </span>
                          )}
                          {item.fieldOfStudy?.en && (
                            <span>
                              <strong>Field:</strong> {item.fieldOfStudy.en}
                            </span>
                          )}
                          {item.yearOfCompletion && (
                            <span>
                              <strong>Year:</strong> {item.yearOfCompletion}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <button
                        onClick={() => handleMoveEducation(idx, -1)}
                        disabled={idx === 0}
                        title="Move Up"
                        style={{
                          padding: '6px',
                          border: '1px solid var(--border-medium)',
                          borderRadius: 'var(--radius-xs)',
                          backgroundColor: '#FFFFFF',
                          cursor: idx === 0 ? 'not-allowed' : 'pointer',
                          opacity: idx === 0 ? 0.4 : 1,
                        }}
                      >
                        <ArrowUp size={14} />
                      </button>

                      <button
                        onClick={() => handleMoveEducation(idx, 1)}
                        disabled={idx === profile.educationalQualifications.length - 1}
                        title="Move Down"
                        style={{
                          padding: '6px',
                          border: '1px solid var(--border-medium)',
                          borderRadius: 'var(--radius-xs)',
                          backgroundColor: '#FFFFFF',
                          cursor: idx === profile.educationalQualifications.length - 1 ? 'not-allowed' : 'pointer',
                          opacity: idx === profile.educationalQualifications.length - 1 ? 0.4 : 1,
                        }}
                      >
                        <ArrowDown size={14} />
                      </button>

                      <button
                        onClick={() => setEditingEducation({ index: idx, item: { ...item } })}
                        className="btn btn-outline btn-sm"
                        style={{ padding: '6px 10px' }}
                      >
                        <Edit size={14} />
                        <span>Edit</span>
                      </button>

                      <button
                        onClick={() => handleDeleteEducation(idx)}
                        className="btn btn-outline btn-sm"
                        style={{ padding: '6px 10px', color: '#D95D1E', borderColor: '#D95D1E' }}
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {/* 3. GANDRA JYOTHI TAB */}
        {activeTab === 'gandraJyothi' && (
          <div style={{ backgroundColor: '#FFFFFF', padding: '32px', borderRadius: 'var(--radius-xs)', border: '1px solid var(--border-subtle)' }}>
            <h1 style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--accent-navy)', marginBottom: '8px' }}>
              Manage Smt. Gandra Jyothi Dedicated Section
            </h1>
            <p style={{ fontSize: '0.86rem', color: 'var(--text-secondary)', marginBottom: '24px' }}>
              Keep information verified, respectful, and dignified. Supports both Telugu and English.
            </p>

            <form onSubmit={handleSaveGandraJyothi} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                <input
                  type="checkbox"
                  id="jyothiPublish"
                  checked={profile.gandraJyothi?.isPublished !== false}
                  onChange={(e) =>
                    setProfile({
                      ...profile,
                      gandraJyothi: { ...profile.gandraJyothi, isPublished: e.target.checked },
                    })
                  }
                />
                <label htmlFor="jyothiPublish" style={{ fontWeight: 600, fontSize: '0.9rem' }}>
                  Publish this section on the public website
                </label>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, marginBottom: '6px' }}>Name (English)</label>
                  <input
                    type="text"
                    value={profile.gandraJyothi?.name?.en || ''}
                    onChange={(e) =>
                      setProfile({
                        ...profile,
                        gandraJyothi: {
                          ...profile.gandraJyothi,
                          name: { ...profile.gandraJyothi.name, en: e.target.value },
                        },
                      })
                    }
                    style={{ width: '100%', padding: '10px', border: '1px solid var(--border-medium)', borderRadius: 'var(--radius-xs)' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, marginBottom: '6px' }}>పేరు (తెలుగు)</label>
                  <input
                    type="text"
                    value={profile.gandraJyothi?.name?.te || ''}
                    onChange={(e) =>
                      setProfile({
                        ...profile,
                        gandraJyothi: {
                          ...profile.gandraJyothi,
                          name: { ...profile.gandraJyothi.name, te: e.target.value },
                        },
                      })
                    }
                    style={{ width: '100%', padding: '10px', border: '1px solid var(--border-medium)', borderRadius: 'var(--radius-xs)', fontFamily: 'var(--font-telugu)' }}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, marginBottom: '6px' }}>Role / Title (English)</label>
                  <input
                    type="text"
                    value={profile.gandraJyothi?.title?.en || ''}
                    onChange={(e) =>
                      setProfile({
                        ...profile,
                        gandraJyothi: {
                          ...profile.gandraJyothi,
                          title: { ...profile.gandraJyothi.title, en: e.target.value },
                        },
                      })
                    }
                    style={{ width: '100%', padding: '10px', border: '1px solid var(--border-medium)', borderRadius: 'var(--radius-xs)' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, marginBottom: '6px' }}>పదవి (తెలుగు)</label>
                  <input
                    type="text"
                    value={profile.gandraJyothi?.title?.te || ''}
                    onChange={(e) =>
                      setProfile({
                        ...profile,
                        gandraJyothi: {
                          ...profile.gandraJyothi,
                          title: { ...profile.gandraJyothi.title, te: e.target.value },
                        },
                      })
                    }
                    style={{ width: '100%', padding: '10px', border: '1px solid var(--border-medium)', borderRadius: 'var(--radius-xs)', fontFamily: 'var(--font-telugu)' }}
                  />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, marginBottom: '6px' }}>Short Introduction / Quote (English)</label>
                <input
                  type="text"
                  value={profile.gandraJyothi?.introduction?.en || ''}
                  onChange={(e) =>
                    setProfile({
                      ...profile,
                      gandraJyothi: {
                        ...profile.gandraJyothi,
                        introduction: { ...profile.gandraJyothi?.introduction, en: e.target.value },
                      },
                    })
                  }
                  style={{ width: '100%', padding: '10px', border: '1px solid var(--border-medium)', borderRadius: 'var(--radius-xs)' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, marginBottom: '6px' }}>సంక్షిప్త పరిచయం / కోట్ (తెలుగు)</label>
                <input
                  type="text"
                  value={profile.gandraJyothi?.introduction?.te || ''}
                  onChange={(e) =>
                    setProfile({
                      ...profile,
                      gandraJyothi: {
                        ...profile.gandraJyothi,
                        introduction: { ...profile.gandraJyothi?.introduction, te: e.target.value },
                      },
                    })
                  }
                  style={{ width: '100%', padding: '10px', border: '1px solid var(--border-medium)', borderRadius: 'var(--radius-xs)', fontFamily: 'var(--font-telugu)' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, marginBottom: '6px' }}>Respectful Biography (English)</label>
                <textarea
                  rows={4}
                  value={profile.gandraJyothi?.biography?.en || ''}
                  onChange={(e) =>
                    setProfile({
                      ...profile,
                      gandraJyothi: {
                        ...profile.gandraJyothi,
                        biography: { ...profile.gandraJyothi.biography, en: e.target.value },
                      },
                    })
                  }
                  style={{ width: '100%', padding: '10px', border: '1px solid var(--border-medium)', borderRadius: 'var(--radius-xs)' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, marginBottom: '6px' }}>గౌరవప్రదమైన జీవిత చరిత్ర (తెలుగు)</label>
                <textarea
                  rows={4}
                  value={profile.gandraJyothi?.biography?.te || ''}
                  onChange={(e) =>
                    setProfile({
                      ...profile,
                      gandraJyothi: {
                        ...profile.gandraJyothi,
                        biography: { ...profile.gandraJyothi.biography, te: e.target.value },
                      },
                    })
                  }
                  style={{ width: '100%', padding: '10px', border: '1px solid var(--border-medium)', borderRadius: 'var(--radius-xs)', fontFamily: 'var(--font-telugu)' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, marginBottom: '6px' }}>Community & Grassroots Involvement (English)</label>
                <textarea
                  rows={3}
                  value={profile.gandraJyothi?.communityInvolvement?.en || profile.gandraJyothi?.publicService?.en || ''}
                  onChange={(e) =>
                    setProfile({
                      ...profile,
                      gandraJyothi: {
                        ...profile.gandraJyothi,
                        communityInvolvement: { ...profile.gandraJyothi?.communityInvolvement, en: e.target.value },
                      },
                    })
                  }
                  style={{ width: '100%', padding: '10px', border: '1px solid var(--border-medium)', borderRadius: 'var(--radius-xs)' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, marginBottom: '6px' }}>క్షేత్రస్థాయి ప్రజా భాగస్వామ్యం (తెలుగు)</label>
                <textarea
                  rows={3}
                  value={profile.gandraJyothi?.communityInvolvement?.te || profile.gandraJyothi?.publicService?.te || ''}
                  onChange={(e) =>
                    setProfile({
                      ...profile,
                      gandraJyothi: {
                        ...profile.gandraJyothi,
                        communityInvolvement: { ...profile.gandraJyothi?.communityInvolvement, te: e.target.value },
                      },
                    })
                  }
                  style={{ width: '100%', padding: '10px', border: '1px solid var(--border-medium)', borderRadius: 'var(--radius-xs)', fontFamily: 'var(--font-telugu)' }}
                />
              </div>

              {/* Photographs Configuration */}
              <div style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: '20px', marginTop: '10px' }}>
                <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--accent-navy)', marginBottom: '14px' }}>
                  Approved Photographs (Smt. Gandra Jyothi)
                </h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '20px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, marginBottom: '6px' }}>
                      Solo Portrait Image
                    </label>
                    <input
                      type="text"
                      value={profile.gandraJyothi?.photo || ''}
                      onChange={(e) =>
                        setProfile({
                          ...profile,
                          gandraJyothi: {
                            ...profile.gandraJyothi,
                            photo: e.target.value,
                          },
                        })
                      }
                      placeholder="/images/gandra-jyothi-portrait.png"
                      style={{ width: '100%', padding: '9px', border: '1px solid var(--border-medium)', borderRadius: 'var(--radius-xs)', marginBottom: '6px' }}
                    />
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleJyothiPhotoUpload(e, 'photo')}
                      style={{ fontSize: '0.78rem' }}
                    />
                    {profile.gandraJyothi?.photo && (
                      <div style={{ marginTop: '8px', width: '70px', height: '70px', borderRadius: '4px', overflow: 'hidden', border: '1px solid var(--border-medium)' }}>
                        <img src={profile.gandraJyothi.photo} alt="Portrait Preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      </div>
                    )}
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, marginBottom: '6px' }}>
                      Together with Leader Image
                    </label>
                    <input
                      type="text"
                      value={profile.gandraJyothi?.couplePhoto || ''}
                      onChange={(e) =>
                        setProfile({
                          ...profile,
                          gandraJyothi: {
                            ...profile.gandraJyothi,
                            couplePhoto: e.target.value,
                          },
                        })
                      }
                      placeholder="/images/gandra-reddy-jyothi-together.png"
                      style={{ width: '100%', padding: '9px', border: '1px solid var(--border-medium)', borderRadius: 'var(--radius-xs)', marginBottom: '6px' }}
                    />
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleJyothiPhotoUpload(e, 'couplePhoto')}
                      style={{ fontSize: '0.78rem' }}
                    />
                    {profile.gandraJyothi?.couplePhoto && (
                      <div style={{ marginTop: '8px', width: '70px', height: '70px', borderRadius: '4px', overflow: 'hidden', border: '1px solid var(--border-medium)' }}>
                        <img src={profile.gandraJyothi.couplePhoto} alt="Together Preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      </div>
                    )}
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, marginBottom: '6px' }}>
                      Public / State Event Image
                    </label>
                    <input
                      type="text"
                      value={profile.gandraJyothi?.eventPhoto || ''}
                      onChange={(e) =>
                        setProfile({
                          ...profile,
                          gandraJyothi: {
                            ...profile.gandraJyothi,
                            eventPhoto: e.target.value,
                          },
                        })
                      }
                      placeholder="/images/gandra-event-ktr.png"
                      style={{ width: '100%', padding: '9px', border: '1px solid var(--border-medium)', borderRadius: 'var(--radius-xs)', marginBottom: '6px' }}
                    />
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleJyothiPhotoUpload(e, 'eventPhoto')}
                      style={{ fontSize: '0.78rem' }}
                    />
                    {profile.gandraJyothi?.eventPhoto && (
                      <div style={{ marginTop: '8px', width: '70px', height: '70px', borderRadius: '4px', overflow: 'hidden', border: '1px solid var(--border-medium)' }}>
                        <img src={profile.gandraJyothi.eventPhoto} alt="Event Preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <button type="submit" className="btn btn-primary" style={{ alignSelf: 'flex-start' }}>
                <Save size={16} />
                <span>Save Smt. Gandra Jyothi Section</span>
              </button>
            </form>
          </div>
        )}

        {/* 3.5. SOCIAL MEDIA & CONNECT TAB */}
        {activeTab === 'socialMedia' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
            <div style={{ backgroundColor: '#FFFFFF', padding: '26px 30px', borderRadius: 'var(--radius-xs)', border: '1px solid var(--border-subtle)', boxShadow: 'var(--shadow-sm)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: 'var(--radius-xs)', backgroundColor: 'rgba(10, 25, 47, 0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Share2 size={20} color="var(--accent-navy)" />
                </div>
                <div>
                  <h1 style={{ fontSize: '1.45rem', fontWeight: 700, color: 'var(--accent-navy)', margin: 0 }}>
                    Official Social Media & Connect Management
                  </h1>
                  <p style={{ fontSize: '0.86rem', color: 'var(--text-secondary)', margin: '4px 0 0' }}>
                    Configure verified official social media profile URLs for Sri Gandra Venkata Ramana Reddy and Smt. Gandra Jyothi.
                  </p>
                </div>
              </div>

              <div style={{ marginTop: '16px', backgroundColor: 'rgba(197, 168, 128, 0.12)', borderLeft: '4px solid var(--accent-gold)', padding: '12px 16px', borderRadius: 'var(--radius-xs)', fontSize: '0.84rem', color: 'var(--text-secondary)', lineHeight: 1.55 }}>
                <strong>Guidelines:</strong> Enter complete, genuine profile URLs (e.g. <code>https://facebook.com/officialhandle</code>, <code>https://instagram.com/officialhandle</code>). If a profile is not yet active or verified, leave the field completely empty. Empty fields will automatically display the dignified "Official Handles Verification in Progress" status to citizens without any broken links.
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '26px' }}>
              {/* Leader 1: Sri GVR */}
              <div style={{ backgroundColor: '#FFFFFF', borderRadius: 'var(--radius-xs)', border: '1px solid var(--border-medium)', borderTop: '4px solid var(--accent-navy)', padding: '26px', boxShadow: 'var(--shadow-sm)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '20px', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '14px' }}>
                  <img
                    src={profile.portraitImage || '/images/gandra-ramana-reddy-portrait.png'}
                    alt="Sri GVR"
                    style={{ width: '50px', height: '50px', borderRadius: '50%', objectFit: 'cover', border: '2px solid var(--accent-gold)' }}
                  />
                  <div>
                    <h2 style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--accent-navy)', margin: 0 }}>
                      Sri Gandra Venkata Ramana Reddy
                    </h2>
                    <span style={{ fontSize: '0.78rem', color: 'var(--accent-saffron)', fontWeight: 600 }}>
                      Former MLA & Government Chief Whip
                    </span>
                  </div>
                </div>

                <form onSubmit={handleSaveGvrSocial} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  {/* Facebook */}
                  <div>
                    <label style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', fontWeight: 700, marginBottom: '4px' }}>
                      <span>Facebook Profile / Page URL</span>
                      <span style={{ fontSize: '0.72rem', fontWeight: 600, color: profile.contactInfo?.socialLinks?.facebook?.trim() ? 'var(--accent-green)' : 'var(--text-muted)' }}>
                        {profile.contactInfo?.socialLinks?.facebook?.trim() ? '✓ Configured' : 'Empty (Pending)'}
                      </span>
                    </label>
                    <input
                      type="url"
                      placeholder="https://facebook.com/your-official-page"
                      value={profile.contactInfo?.socialLinks?.facebook || ''}
                      onChange={(e) =>
                        setProfile({
                          ...profile,
                          contactInfo: {
                            ...profile.contactInfo,
                            socialLinks: {
                              ...(profile.contactInfo?.socialLinks || {}),
                              facebook: e.target.value,
                            },
                          },
                        })
                      }
                      style={{ width: '100%', padding: '9px 12px', border: '1px solid var(--border-medium)', borderRadius: 'var(--radius-xs)', fontSize: '0.86rem' }}
                    />
                  </div>

                  {/* Instagram */}
                  <div>
                    <label style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', fontWeight: 700, marginBottom: '4px' }}>
                      <span>Instagram Profile URL</span>
                      <span style={{ fontSize: '0.72rem', fontWeight: 600, color: profile.contactInfo?.socialLinks?.instagram?.trim() ? 'var(--accent-green)' : 'var(--text-muted)' }}>
                        {profile.contactInfo?.socialLinks?.instagram?.trim() ? '✓ Configured' : 'Empty (Pending)'}
                      </span>
                    </label>
                    <input
                      type="url"
                      placeholder="https://instagram.com/your_handle"
                      value={profile.contactInfo?.socialLinks?.instagram || ''}
                      onChange={(e) =>
                        setProfile({
                          ...profile,
                          contactInfo: {
                            ...profile.contactInfo,
                            socialLinks: {
                              ...(profile.contactInfo?.socialLinks || {}),
                              instagram: e.target.value,
                            },
                          },
                        })
                      }
                      style={{ width: '100%', padding: '9px 12px', border: '1px solid var(--border-medium)', borderRadius: 'var(--radius-xs)', fontSize: '0.86rem' }}
                    />
                  </div>

                  {/* YouTube */}
                  <div>
                    <label style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', fontWeight: 700, marginBottom: '4px' }}>
                      <span>YouTube Channel URL</span>
                      <span style={{ fontSize: '0.72rem', fontWeight: 600, color: profile.contactInfo?.socialLinks?.youtube?.trim() ? 'var(--accent-green)' : 'var(--text-muted)' }}>
                        {profile.contactInfo?.socialLinks?.youtube?.trim() ? '✓ Configured' : 'Empty (Pending)'}
                      </span>
                    </label>
                    <input
                      type="url"
                      placeholder="https://youtube.com/@yourchannel"
                      value={profile.contactInfo?.socialLinks?.youtube || ''}
                      onChange={(e) =>
                        setProfile({
                          ...profile,
                          contactInfo: {
                            ...profile.contactInfo,
                            socialLinks: {
                              ...(profile.contactInfo?.socialLinks || {}),
                              youtube: e.target.value,
                            },
                          },
                        })
                      }
                      style={{ width: '100%', padding: '9px 12px', border: '1px solid var(--border-medium)', borderRadius: 'var(--radius-xs)', fontSize: '0.86rem' }}
                    />
                  </div>

                  {/* X (formerly Twitter) */}
                  <div>
                    <label style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', fontWeight: 700, marginBottom: '4px' }}>
                      <span>X (formerly Twitter) Profile URL</span>
                      <span style={{ fontSize: '0.72rem', fontWeight: 600, color: profile.contactInfo?.socialLinks?.twitter?.trim() ? 'var(--accent-green)' : 'var(--text-muted)' }}>
                        {profile.contactInfo?.socialLinks?.twitter?.trim() ? '✓ Configured' : 'Empty (Pending)'}
                      </span>
                    </label>
                    <input
                      type="url"
                      placeholder="https://x.com/your_handle"
                      value={profile.contactInfo?.socialLinks?.twitter || ''}
                      onChange={(e) =>
                        setProfile({
                          ...profile,
                          contactInfo: {
                            ...profile.contactInfo,
                            socialLinks: {
                              ...(profile.contactInfo?.socialLinks || {}),
                              twitter: e.target.value,
                            },
                          },
                        })
                      }
                      style={{ width: '100%', padding: '9px 12px', border: '1px solid var(--border-medium)', borderRadius: 'var(--radius-xs)', fontSize: '0.86rem' }}
                    />
                  </div>

                  {/* LinkedIn */}
                  <div>
                    <label style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', fontWeight: 700, marginBottom: '4px' }}>
                      <span>LinkedIn Profile URL</span>
                      <span style={{ fontSize: '0.72rem', fontWeight: 600, color: profile.contactInfo?.socialLinks?.linkedin?.trim() ? 'var(--accent-green)' : 'var(--text-muted)' }}>
                        {profile.contactInfo?.socialLinks?.linkedin?.trim() ? '✓ Configured' : 'Empty (Pending)'}
                      </span>
                    </label>
                    <input
                      type="url"
                      placeholder="https://linkedin.com/in/yourprofile"
                      value={profile.contactInfo?.socialLinks?.linkedin || ''}
                      onChange={(e) =>
                        setProfile({
                          ...profile,
                          contactInfo: {
                            ...profile.contactInfo,
                            socialLinks: {
                              ...(profile.contactInfo?.socialLinks || {}),
                              linkedin: e.target.value,
                            },
                          },
                        })
                      }
                      style={{ width: '100%', padding: '9px 12px', border: '1px solid var(--border-medium)', borderRadius: 'var(--radius-xs)', fontSize: '0.86rem' }}
                    />
                  </div>

                  <button
                    type="submit"
                    className="btn btn-primary"
                    style={{ marginTop: '10px', display: 'inline-flex', alignItems: 'center', gap: '8px' }}
                  >
                    <Save size={16} />
                    <span>Save Sri GVR Social Links</span>
                  </button>
                </form>
              </div>

              {/* Leader 2: Smt. Gandra Jyothi */}
              <div style={{ backgroundColor: '#FFFFFF', borderRadius: 'var(--radius-xs)', border: '1px solid var(--border-medium)', borderTop: '4px solid var(--accent-green)', padding: '26px', boxShadow: 'var(--shadow-sm)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '20px', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '14px' }}>
                  <img
                    src={profile.gandraJyothi?.photo || '/images/gandra-jyothi-portrait.png'}
                    alt="Smt. Gandra Jyothi"
                    style={{ width: '50px', height: '50px', borderRadius: '50%', objectFit: 'cover', border: '2px solid var(--accent-green)' }}
                  />
                  <div>
                    <h2 style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--accent-navy)', margin: 0 }}>
                      Smt. Gandra Jyothi
                    </h2>
                    <span style={{ fontSize: '0.78rem', color: 'var(--accent-green)', fontWeight: 600 }}>
                      Former ZP Chairperson & Six-Star Marathoner
                    </span>
                  </div>
                </div>

                <form onSubmit={handleSaveJyothiSocial} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  {/* Facebook */}
                  <div>
                    <label style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', fontWeight: 700, marginBottom: '4px' }}>
                      <span>Facebook Profile / Page URL</span>
                      <span style={{ fontSize: '0.72rem', fontWeight: 600, color: profile.gandraJyothi?.socialLinks?.facebook?.trim() ? 'var(--accent-green)' : 'var(--text-muted)' }}>
                        {profile.gandraJyothi?.socialLinks?.facebook?.trim() ? '✓ Configured' : 'Empty (Pending)'}
                      </span>
                    </label>
                    <input
                      type="url"
                      placeholder="https://facebook.com/your-official-page"
                      value={profile.gandraJyothi?.socialLinks?.facebook || ''}
                      onChange={(e) =>
                        setProfile({
                          ...profile,
                          gandraJyothi: {
                            ...profile.gandraJyothi,
                            socialLinks: {
                              ...(profile.gandraJyothi?.socialLinks || {}),
                              facebook: e.target.value,
                            },
                          },
                        })
                      }
                      style={{ width: '100%', padding: '9px 12px', border: '1px solid var(--border-medium)', borderRadius: 'var(--radius-xs)', fontSize: '0.86rem' }}
                    />
                  </div>

                  {/* Instagram */}
                  <div>
                    <label style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', fontWeight: 700, marginBottom: '4px' }}>
                      <span>Instagram Profile URL</span>
                      <span style={{ fontSize: '0.72rem', fontWeight: 600, color: profile.gandraJyothi?.socialLinks?.instagram?.trim() ? 'var(--accent-green)' : 'var(--text-muted)' }}>
                        {profile.gandraJyothi?.socialLinks?.instagram?.trim() ? '✓ Configured' : 'Empty (Pending)'}
                      </span>
                    </label>
                    <input
                      type="url"
                      placeholder="https://instagram.com/your_handle"
                      value={profile.gandraJyothi?.socialLinks?.instagram || ''}
                      onChange={(e) =>
                        setProfile({
                          ...profile,
                          gandraJyothi: {
                            ...profile.gandraJyothi,
                            socialLinks: {
                              ...(profile.gandraJyothi?.socialLinks || {}),
                              instagram: e.target.value,
                            },
                          },
                        })
                      }
                      style={{ width: '100%', padding: '9px 12px', border: '1px solid var(--border-medium)', borderRadius: 'var(--radius-xs)', fontSize: '0.86rem' }}
                    />
                  </div>

                  {/* YouTube */}
                  <div>
                    <label style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', fontWeight: 700, marginBottom: '4px' }}>
                      <span>YouTube Channel URL</span>
                      <span style={{ fontSize: '0.72rem', fontWeight: 600, color: profile.gandraJyothi?.socialLinks?.youtube?.trim() ? 'var(--accent-green)' : 'var(--text-muted)' }}>
                        {profile.gandraJyothi?.socialLinks?.youtube?.trim() ? '✓ Configured' : 'Empty (Pending)'}
                      </span>
                    </label>
                    <input
                      type="url"
                      placeholder="https://youtube.com/@yourchannel"
                      value={profile.gandraJyothi?.socialLinks?.youtube || ''}
                      onChange={(e) =>
                        setProfile({
                          ...profile,
                          gandraJyothi: {
                            ...profile.gandraJyothi,
                            socialLinks: {
                              ...(profile.gandraJyothi?.socialLinks || {}),
                              youtube: e.target.value,
                            },
                          },
                        })
                      }
                      style={{ width: '100%', padding: '9px 12px', border: '1px solid var(--border-medium)', borderRadius: 'var(--radius-xs)', fontSize: '0.86rem' }}
                    />
                  </div>

                  {/* X (formerly Twitter) */}
                  <div>
                    <label style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', fontWeight: 700, marginBottom: '4px' }}>
                      <span>X (formerly Twitter) Profile URL</span>
                      <span style={{ fontSize: '0.72rem', fontWeight: 600, color: profile.gandraJyothi?.socialLinks?.twitter?.trim() ? 'var(--accent-green)' : 'var(--text-muted)' }}>
                        {profile.gandraJyothi?.socialLinks?.twitter?.trim() ? '✓ Configured' : 'Empty (Pending)'}
                      </span>
                    </label>
                    <input
                      type="url"
                      placeholder="https://x.com/your_handle"
                      value={profile.gandraJyothi?.socialLinks?.twitter || ''}
                      onChange={(e) =>
                        setProfile({
                          ...profile,
                          gandraJyothi: {
                            ...profile.gandraJyothi,
                            socialLinks: {
                              ...(profile.gandraJyothi?.socialLinks || {}),
                              twitter: e.target.value,
                            },
                          },
                        })
                      }
                      style={{ width: '100%', padding: '9px 12px', border: '1px solid var(--border-medium)', borderRadius: 'var(--radius-xs)', fontSize: '0.86rem' }}
                    />
                  </div>

                  {/* LinkedIn */}
                  <div>
                    <label style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', fontWeight: 700, marginBottom: '4px' }}>
                      <span>LinkedIn Profile URL</span>
                      <span style={{ fontSize: '0.72rem', fontWeight: 600, color: profile.gandraJyothi?.socialLinks?.linkedin?.trim() ? 'var(--accent-green)' : 'var(--text-muted)' }}>
                        {profile.gandraJyothi?.socialLinks?.linkedin?.trim() ? '✓ Configured' : 'Empty (Pending)'}
                      </span>
                    </label>
                    <input
                      type="url"
                      placeholder="https://linkedin.com/in/yourprofile"
                      value={profile.gandraJyothi?.socialLinks?.linkedin || ''}
                      onChange={(e) =>
                        setProfile({
                          ...profile,
                          gandraJyothi: {
                            ...profile.gandraJyothi,
                            socialLinks: {
                              ...(profile.gandraJyothi?.socialLinks || {}),
                              linkedin: e.target.value,
                            },
                          },
                        })
                      }
                      style={{ width: '100%', padding: '9px 12px', border: '1px solid var(--border-medium)', borderRadius: 'var(--radius-xs)', fontSize: '0.86rem' }}
                    />
                  </div>

                  <button
                    type="submit"
                    className="btn btn-primary"
                    style={{ marginTop: '10px', display: 'inline-flex', alignItems: 'center', gap: '8px', backgroundColor: 'var(--accent-green)', borderColor: 'var(--accent-green)' }}
                  >
                    <Save size={16} />
                    <span>Save Smt. Jyothi Social Links</span>
                  </button>
                </form>
              </div>
            </div>
          </div>
        )}

        {/* 4. ACTIVITIES TAB */}
        {activeTab === 'activities' && (
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
              <h1 style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--accent-navy)' }}>
                Public Activities & Service
                <span style={{ fontSize: '0.9rem', fontWeight: 500, color: 'var(--accent-saffron)', marginLeft: '10px' }}>
                  ({selectedProfile === 'gandra-jyothi' ? 'Smt. Gandra Jyothi' : 'Sri Gandra Venkata Ramana Reddy'})
                </span>
              </h1>
              <button
                onClick={() =>
                  setEditingActivity({
                    profile: selectedProfile,
                    title: { en: '', te: '' },
                    category: selectedProfile === 'gandra-jyothi' ? 'Welfare' : 'Community',
                    date: new Date().toISOString().split('T')[0],
                    location: selectedProfile === 'gandra-jyothi'
                      ? { en: 'Warangal / Bhupalpally, Telangana', te: 'వరంగల్ / భూపాలపల్లి, తెలంగాణ' }
                      : { en: 'Bhupalpally, Telangana', te: 'భూపాలపల్లి, తెలంగాణ' },
                    description: { en: '', te: '' },
                    imageUrl: selectedProfile === 'gandra-jyothi'
                      ? (profile.gandraJyothi?.portrait || '/images/gandra-jyothi-portrait.png')
                      : (profile.portrait || '/images/gandra-ramana-reddy-portrait.png'),
                    status: 'Published',
                  })
                }
                className="btn btn-primary btn-sm"
              >
                <Plus size={16} />
                <span>Add Activity</span>
              </button>
            </div>

            {/* Editing Activity Form Modal */}
            {editingActivity && (
              <div style={{ backgroundColor: '#FFFFFF', padding: '24px', borderRadius: 'var(--radius-xs)', border: '2px solid var(--accent-navy)', marginBottom: '24px' }}>
                <h3 style={{ marginBottom: '16px', color: 'var(--accent-navy)' }}>
                  {editingActivity._id ? 'Edit Activity' : 'Create New Activity'}
                </h3>
                <form onSubmit={handleSaveActivity} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                    <div>
                      <label style={{ fontSize: '0.82rem', fontWeight: 700 }}>Profile Assignment</label>
                      <select
                        value={editingActivity.profile || selectedProfile}
                        onChange={(e) => setEditingActivity({ ...editingActivity, profile: e.target.value })}
                        style={{ width: '100%', padding: '8px', border: '1px solid var(--border-medium)', fontWeight: 600 }}
                      >
                        <option value="gandra-venkata-ramana-reddy">Sri Gandra Venkata Ramana Reddy</option>
                        <option value="gandra-jyothi">Smt. Gandra Jyothi</option>
                      </select>
                    </div>
                    <div>
                      <label style={{ fontSize: '0.82rem', fontWeight: 700 }}>Category</label>
                      <select
                        value={editingActivity.category}
                        onChange={(e) => setEditingActivity({ ...editingActivity, category: e.target.value })}
                        style={{ width: '100%', padding: '8px', border: '1px solid var(--border-medium)' }}
                      >
                        <option value="Community">Community</option>
                        <option value="Welfare">Welfare & Women Empowerment</option>
                        <option value="Infrastructure">Infrastructure</option>
                        <option value="Agriculture">Agriculture & Rural</option>
                        <option value="Grievance">Grievance & Public Outreach</option>
                      </select>
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                    <div>
                      <label style={{ fontSize: '0.82rem', fontWeight: 700 }}>Title (English) *</label>
                      <input
                        type="text"
                        required
                        value={editingActivity.title.en}
                        onChange={(e) => setEditingActivity({ ...editingActivity, title: { ...editingActivity.title, en: e.target.value } })}
                        style={{ width: '100%', padding: '8px', border: '1px solid var(--border-medium)' }}
                      />
                    </div>
                    <div>
                      <label style={{ fontSize: '0.82rem', fontWeight: 700 }}>శీర్షిక (తెలుగు) *</label>
                      <input
                        type="text"
                        required
                        value={editingActivity.title.te}
                        onChange={(e) => setEditingActivity({ ...editingActivity, title: { ...editingActivity.title, te: e.target.value } })}
                        style={{ width: '100%', padding: '8px', border: '1px solid var(--border-medium)', fontFamily: 'var(--font-telugu)' }}
                      />
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                    <div>
                      <label style={{ fontSize: '0.82rem', fontWeight: 700 }}>Date</label>
                      <input
                        type="date"
                        value={typeof editingActivity.date === 'string' ? editingActivity.date.split('T')[0] : ''}
                        onChange={(e) => setEditingActivity({ ...editingActivity, date: e.target.value })}
                        style={{ width: '100%', padding: '8px', border: '1px solid var(--border-medium)' }}
                      />
                    </div>
                    <div>
                      <label style={{ fontSize: '0.82rem', fontWeight: 700 }}>Status</label>
                      <select
                        value={editingActivity.status}
                        onChange={(e) => setEditingActivity({ ...editingActivity, status: e.target.value })}
                        style={{ width: '100%', padding: '8px', border: '1px solid var(--border-medium)' }}
                      >
                        <option value="Published">Published</option>
                        <option value="Draft">Draft</option>
                      </select>
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: '14px', alignItems: 'center' }}>
                    <div>
                      <label style={{ fontSize: '0.82rem', fontWeight: 700 }}>Cover Image URL / Path</label>
                      <input
                        type="text"
                        value={editingActivity.imageUrl || ''}
                        onChange={(e) => setEditingActivity({ ...editingActivity, imageUrl: e.target.value })}
                        style={{ width: '100%', padding: '8px', border: '1px solid var(--border-medium)' }}
                        placeholder="/images/... or upload file below"
                      />
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleActivityImageUpload}
                        style={{ marginTop: '6px', fontSize: '0.8rem' }}
                      />
                    </div>
                    {editingActivity.imageUrl && (
                      <div style={{ width: '80px', height: '60px', borderRadius: '4px', overflow: 'hidden', border: '1px solid var(--border-medium)' }}>
                        <img src={editingActivity.imageUrl} alt="Activity Preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      </div>
                    )}
                  </div>

                  <div>
                    <label style={{ fontSize: '0.82rem', fontWeight: 700 }}>Description (English) *</label>
                    <textarea
                      rows={3}
                      required
                      value={editingActivity.description.en}
                      onChange={(e) => setEditingActivity({ ...editingActivity, description: { ...editingActivity.description, en: e.target.value } })}
                      style={{ width: '100%', padding: '8px', border: '1px solid var(--border-medium)' }}
                    />
                  </div>

                  <div>
                    <label style={{ fontSize: '0.82rem', fontWeight: 700 }}>వివరాలు (తెలుగు) *</label>
                    <textarea
                      rows={3}
                      required
                      value={editingActivity.description.te}
                      onChange={(e) => setEditingActivity({ ...editingActivity, description: { ...editingActivity.description, te: e.target.value } })}
                      style={{ width: '100%', padding: '8px', border: '1px solid var(--border-medium)', fontFamily: 'var(--font-telugu)' }}
                    />
                  </div>

                  <div style={{ display: 'flex', gap: '10px' }}>
                    <button type="submit" className="btn btn-primary btn-sm">Save Activity</button>
                    <button type="button" onClick={() => setEditingActivity(null)} className="btn btn-outline btn-sm">Cancel</button>
                  </div>
                </form>
              </div>
            )}

            {/* List */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {activities.map((item) => (
                <div
                  key={item._id}
                  style={{
                    backgroundColor: '#FFFFFF',
                    padding: '16px 20px',
                    borderRadius: 'var(--radius-xs)',
                    border: '1px solid var(--border-subtle)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '16px',
                  }}
                >
                  <div>
                    <div style={{ fontWeight: 700, color: 'var(--accent-navy)', fontSize: '1rem' }}>
                      {item.title?.en || item.title?.te}
                    </div>
                    <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                      Category: {item.category} | Status: {item.status}
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button onClick={() => setEditingActivity(item)} className="btn btn-outline btn-sm" style={{ padding: '6px 10px' }}>
                      <Edit size={14} />
                    </button>
                    <button onClick={() => handleDeleteActivity(item._id)} className="btn btn-outline btn-sm" style={{ padding: '6px 10px', color: '#D95D1E', borderColor: '#D95D1E' }}>
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 5. MILESTONES TAB */}
        {activeTab === 'milestones' && (
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
              <h1 style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--accent-navy)' }}>
                Milestones & Achievements Timeline
                <span style={{ fontSize: '0.9rem', fontWeight: 500, color: 'var(--accent-saffron)', marginLeft: '10px' }}>
                  ({selectedProfile === 'gandra-jyothi' ? 'Smt. Gandra Jyothi' : 'Sri Gandra Venkata Ramana Reddy'})
                </span>
              </h1>
              <button
                onClick={() =>
                  setEditingMilestone({
                    profile: selectedProfile,
                    year: '2024',
                    order: milestones.length + 1,
                    title: { en: '', te: '' },
                    roleOrCategory: { en: '', te: '' },
                    description: { en: '', te: '' },
                    isVerified: true,
                  })
                }
                className="btn btn-primary btn-sm"
              >
                <Plus size={16} />
                <span>Add Milestone</span>
              </button>
            </div>

            {editingMilestone && (
              <div style={{ backgroundColor: '#FFFFFF', padding: '24px', borderRadius: 'var(--radius-xs)', border: '2px solid var(--accent-navy)', marginBottom: '24px' }}>
                <h3 style={{ marginBottom: '16px', color: 'var(--accent-navy)' }}>
                  {editingMilestone._id ? 'Edit Milestone' : 'Add Confirmed Milestone'}
                </h3>
                <form onSubmit={handleSaveMilestone} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                  <div>
                    <label style={{ fontSize: '0.82rem', fontWeight: 700 }}>Profile Assignment</label>
                    <select
                      value={editingMilestone.profile || selectedProfile}
                      onChange={(e) => setEditingMilestone({ ...editingMilestone, profile: e.target.value })}
                      style={{ width: '100%', padding: '8px', border: '1px solid var(--border-medium)', fontWeight: 600 }}
                    >
                      <option value="gandra-venkata-ramana-reddy">Sri Gandra Venkata Ramana Reddy</option>
                      <option value="gandra-jyothi">Smt. Gandra Jyothi</option>
                    </select>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                    <div>
                      <label style={{ fontSize: '0.82rem', fontWeight: 700 }}>Year (e.g. 2018 or 2009-2014) *</label>
                      <input
                        type="text"
                        required
                        value={editingMilestone.year}
                        onChange={(e) => setEditingMilestone({ ...editingMilestone, year: e.target.value })}
                        style={{ width: '100%', padding: '8px', border: '1px solid var(--border-medium)' }}
                      />
                    </div>
                    <div>
                      <label style={{ fontSize: '0.82rem', fontWeight: 700 }}>Order Priority</label>
                      <input
                        type="number"
                        value={editingMilestone.order || 0}
                        onChange={(e) => setEditingMilestone({ ...editingMilestone, order: parseInt(e.target.value, 10) })}
                        style={{ width: '100%', padding: '8px', border: '1px solid var(--border-medium)' }}
                      />
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                    <div>
                      <label style={{ fontSize: '0.82rem', fontWeight: 700 }}>Title (English) *</label>
                      <input
                        type="text"
                        required
                        value={editingMilestone.title?.en || ''}
                        onChange={(e) => setEditingMilestone({ ...editingMilestone, title: { ...editingMilestone.title, en: e.target.value } })}
                        style={{ width: '100%', padding: '8px', border: '1px solid var(--border-medium)' }}
                      />
                    </div>
                    <div>
                      <label style={{ fontSize: '0.82rem', fontWeight: 700 }}>శీర్షిక (తెలుగు) *</label>
                      <input
                        type="text"
                        required
                        value={editingMilestone.title?.te || ''}
                        onChange={(e) => setEditingMilestone({ ...editingMilestone, title: { ...editingMilestone.title, te: e.target.value } })}
                        style={{ width: '100%', padding: '8px', border: '1px solid var(--border-medium)', fontFamily: 'var(--font-telugu)' }}
                      />
                    </div>
                  </div>

                  <div>
                    <label style={{ fontSize: '0.82rem', fontWeight: 700 }}>Description (English) *</label>
                    <textarea
                      rows={2}
                      required
                      value={editingMilestone.description?.en || ''}
                      onChange={(e) => setEditingMilestone({ ...editingMilestone, description: { ...editingMilestone.description, en: e.target.value } })}
                      style={{ width: '100%', padding: '8px', border: '1px solid var(--border-medium)' }}
                    />
                  </div>

                  <div>
                    <label style={{ fontSize: '0.82rem', fontWeight: 700 }}>వివరణ (తెలుగు) *</label>
                    <textarea
                      rows={2}
                      required
                      value={editingMilestone.description?.te || ''}
                      onChange={(e) => setEditingMilestone({ ...editingMilestone, description: { ...editingMilestone.description, te: e.target.value } })}
                      style={{ width: '100%', padding: '8px', border: '1px solid var(--border-medium)', fontFamily: 'var(--font-telugu)' }}
                    />
                  </div>

                  <div style={{ display: 'flex', gap: '10px' }}>
                    <button type="submit" className="btn btn-primary btn-sm">Save Milestone</button>
                    <button type="button" onClick={() => setEditingMilestone(null)} className="btn btn-outline btn-sm">Cancel</button>
                  </div>
                </form>
              </div>
            )}

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {milestones.map((item) => (
                <div
                  key={item._id}
                  style={{
                    backgroundColor: '#FFFFFF',
                    padding: '16px 20px',
                    borderRadius: 'var(--radius-xs)',
                    border: '1px solid var(--border-subtle)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '16px',
                  }}
                >
                  <div>
                    <span style={{ fontWeight: 800, color: 'var(--accent-saffron)', marginRight: '10px' }}>{item.year}:</span>
                    <strong style={{ color: 'var(--accent-navy)' }}>{item.title?.en}</strong>
                  </div>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button onClick={() => setEditingMilestone(item)} className="btn btn-outline btn-sm" style={{ padding: '6px 10px' }}>
                      <Edit size={14} />
                    </button>
                    <button onClick={() => handleDeleteMilestone(item._id)} className="btn btn-outline btn-sm" style={{ padding: '6px 10px', color: '#D95D1E', borderColor: '#D95D1E' }}>
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 6. PHOTO GALLERY TAB */}
        {activeTab === 'gallery' && (
          <div>
            <h1 style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--accent-navy)', marginBottom: '24px' }}>
              Photo Gallery & Media Archive
              <span style={{ fontSize: '0.9rem', fontWeight: 500, color: 'var(--accent-saffron)', marginLeft: '10px' }}>
                ({selectedProfile === 'gandra-jyothi' ? 'Smt. Gandra Jyothi' : 'Sri Gandra Venkata Ramana Reddy'})
              </span>
            </h1>

            {/* Add Photo Form */}
            <div style={{ backgroundColor: '#FFFFFF', padding: '24px', borderRadius: 'var(--radius-xs)', border: '1px solid var(--border-subtle)', marginBottom: '28px' }}>
              <h3 style={{ marginBottom: '14px', color: 'var(--accent-navy)' }}>Upload or Add Authorized Photograph</h3>
              <form onSubmit={handleCreateGalleryItem} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                  <div>
                    <label style={{ fontSize: '0.82rem', fontWeight: 700 }}>Profile Assignment</label>
                    <select
                      value={newGalleryItem.profile || selectedProfile}
                      onChange={(e) => setNewGalleryItem({ ...newGalleryItem, profile: e.target.value })}
                      style={{ width: '100%', padding: '8px', border: '1px solid var(--border-medium)', fontWeight: 600 }}
                    >
                      <option value="gandra-venkata-ramana-reddy">Sri Gandra Venkata Ramana Reddy</option>
                      <option value="gandra-jyothi">Smt. Gandra Jyothi</option>
                    </select>
                  </div>
                  <div>
                    <label style={{ fontSize: '0.82rem', fontWeight: 700 }}>Category</label>
                    <select
                      value={newGalleryItem.category}
                      onChange={(e) => setNewGalleryItem({ ...newGalleryItem, category: e.target.value })}
                      style={{ width: '100%', padding: '8px', border: '1px solid var(--border-medium)' }}
                    >
                      <option value="Public Engagements">Public Engagements</option>
                      <option value="State Affairs">State Affairs</option>
                      <option value="Community Programs">Community Programs</option>
                      <option value="Welfare & Women Empowerment">Welfare & Women Empowerment</option>
                      <option value="Marathon & Sports">Marathon & Sports</option>
                      <option value="Family & Leadership">Family & Leadership</option>
                    </select>
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                  <div>
                    <label style={{ fontSize: '0.82rem', fontWeight: 700 }}>Upload Image File (PNG, JPG, WEBP)</label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageFileUpload}
                      style={{ width: '100%', padding: '8px', border: '1px solid var(--border-medium)', marginTop: '4px' }}
                    />
                    {uploadingImage && <span style={{ fontSize: '0.8rem', color: 'var(--accent-saffron)' }}>Uploading...</span>}
                  </div>
                  <div>
                    <label style={{ fontSize: '0.82rem', fontWeight: 700 }}>Image URL / Asset Path</label>
                    <input
                      type="text"
                      placeholder="/images/photo.png or /uploads/..."
                      value={newGalleryItem.imageUrl}
                      onChange={(e) => setNewGalleryItem({ ...newGalleryItem, imageUrl: e.target.value })}
                      style={{ width: '100%', padding: '8px', border: '1px solid var(--border-medium)', marginTop: '4px' }}
                    />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                  <div>
                    <label style={{ fontSize: '0.82rem', fontWeight: 700 }}>Title (English) *</label>
                    <input
                      type="text"
                      required
                      value={newGalleryItem.title.en}
                      onChange={(e) => setNewGalleryItem({ ...newGalleryItem, title: { ...newGalleryItem.title, en: e.target.value } })}
                      style={{ width: '100%', padding: '8px', border: '1px solid var(--border-medium)' }}
                    />
                  </div>
                  <div>
                    <label style={{ fontSize: '0.82rem', fontWeight: 700 }}>శీర్షిక (తెలుగు) *</label>
                    <input
                      type="text"
                      required
                      value={newGalleryItem.title.te}
                      onChange={(e) => setNewGalleryItem({ ...newGalleryItem, title: { ...newGalleryItem.title, te: e.target.value } })}
                      style={{ width: '100%', padding: '8px', border: '1px solid var(--border-medium)', fontFamily: 'var(--font-telugu)' }}
                    />
                  </div>
                </div>

                <button type="submit" className="btn btn-primary btn-sm" style={{ alignSelf: 'flex-start' }}>
                  <Upload size={14} />
                  <span>Add Photo to Gallery</span>
                </button>
              </form>
            </div>

            {/* Existing Photos Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '16px' }}>
              {gallery.map((img) => (
                <div
                  key={img._id}
                  style={{
                    backgroundColor: '#FFFFFF',
                    borderRadius: 'var(--radius-xs)',
                    border: '1px solid var(--border-subtle)',
                    overflow: 'hidden',
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                >
                  <img src={img.imageUrl} alt={img.title?.en} style={{ width: '100%', height: '160px', objectFit: 'cover' }} />
                  <div style={{ padding: '12px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                    <div style={{ fontWeight: 700, fontSize: '0.85rem', color: 'var(--accent-navy)', marginBottom: '4px' }}>
                      {img.title?.en}
                    </div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '10px' }}>{img.category}</div>
                    <button
                      onClick={() => handleDeleteGallery(img._id)}
                      className="btn btn-outline btn-sm"
                      style={{ marginTop: 'auto', color: '#D95D1E', borderColor: '#D95D1E', padding: '4px 8px', fontSize: '0.78rem' }}
                    >
                      <Trash2 size={12} />
                      <span>Delete</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 7. NEWS TAB */}
        {activeTab === 'news' && (
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
              <h1 style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--accent-navy)' }}>
                News & Statements
                <span style={{ fontSize: '0.9rem', fontWeight: 500, color: 'var(--accent-saffron)', marginLeft: '10px' }}>
                  ({selectedProfile === 'gandra-jyothi' ? 'Smt. Gandra Jyothi' : 'Sri Gandra Venkata Ramana Reddy'})
                </span>
              </h1>
              <button
                onClick={() =>
                  setEditingNews({
                    profile: selectedProfile,
                    title: { en: '', te: '' },
                    summary: { en: '', te: '' },
                    content: { en: '', te: '' },
                    category: { en: 'Press Statement', te: 'పత్రికా ప్రకటన' },
                    imageUrl: selectedProfile === 'gandra-jyothi'
                      ? (profile.gandraJyothi?.portrait || '/images/gandra-jyothi-portrait.png')
                      : (profile.portrait || '/images/gandra-ramana-reddy-portrait.png'),
                    isPublished: true,
                  })
                }
                className="btn btn-primary btn-sm"
              >
                <Plus size={16} />
                <span>Create Statement</span>
              </button>
            </div>

            {editingNews && (
              <div style={{ backgroundColor: '#FFFFFF', padding: '24px', borderRadius: 'var(--radius-xs)', border: '2px solid var(--accent-navy)', marginBottom: '24px' }}>
                <h3 style={{ marginBottom: '16px', color: 'var(--accent-navy)' }}>
                  {editingNews._id ? 'Edit Statement' : 'Publish Statement'}
                </h3>
                <form onSubmit={handleSaveNews} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                    <div>
                      <label style={{ fontSize: '0.82rem', fontWeight: 700 }}>Profile Assignment</label>
                      <select
                        value={editingNews.profile || selectedProfile}
                        onChange={(e) => setEditingNews({ ...editingNews, profile: e.target.value })}
                        style={{ width: '100%', padding: '8px', border: '1px solid var(--border-medium)', fontWeight: 600 }}
                      >
                        <option value="gandra-venkata-ramana-reddy">Sri Gandra Venkata Ramana Reddy</option>
                        <option value="gandra-jyothi">Smt. Gandra Jyothi</option>
                      </select>
                    </div>
                    <div>
                      <label style={{ fontSize: '0.82rem', fontWeight: 700 }}>Category</label>
                      <input
                        type="text"
                        value={editingNews.category?.en || 'Press Statement'}
                        onChange={(e) => setEditingNews({ ...editingNews, category: { ...editingNews.category, en: e.target.value } })}
                        style={{ width: '100%', padding: '8px', border: '1px solid var(--border-medium)' }}
                        placeholder="e.g. Press Statement"
                      />
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: '14px', alignItems: 'center' }}>
                    <div>
                      <label style={{ fontSize: '0.82rem', fontWeight: 700 }}>Statement Image URL / Path</label>
                      <input
                        type="text"
                        value={editingNews.imageUrl || ''}
                        onChange={(e) => setEditingNews({ ...editingNews, imageUrl: e.target.value })}
                        style={{ width: '100%', padding: '8px', border: '1px solid var(--border-medium)' }}
                        placeholder="/images/... or upload file below"
                      />
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleNewsImageUpload}
                        style={{ marginTop: '6px', fontSize: '0.8rem' }}
                      />
                    </div>
                    {editingNews.imageUrl && (
                      <div style={{ width: '80px', height: '60px', borderRadius: '4px', overflow: 'hidden', border: '1px solid var(--border-medium)' }}>
                        <img src={editingNews.imageUrl} alt="News Preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      </div>
                    )}
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                    <div>
                      <label style={{ fontSize: '0.82rem', fontWeight: 700 }}>Headline (English) *</label>
                      <input
                        type="text"
                        required
                        value={editingNews.title?.en || ''}
                        onChange={(e) => setEditingNews({ ...editingNews, title: { ...editingNews.title, en: e.target.value } })}
                        style={{ width: '100%', padding: '8px', border: '1px solid var(--border-medium)' }}
                      />
                    </div>
                    <div>
                      <label style={{ fontSize: '0.82rem', fontWeight: 700 }}>శీర్షిక (తెలుగు) *</label>
                      <input
                        type="text"
                        required
                        value={editingNews.title?.te || ''}
                        onChange={(e) => setEditingNews({ ...editingNews, title: { ...editingNews.title, te: e.target.value } })}
                        style={{ width: '100%', padding: '8px', border: '1px solid var(--border-medium)', fontFamily: 'var(--font-telugu)' }}
                      />
                    </div>
                  </div>

                  <div>
                    <label style={{ fontSize: '0.82rem', fontWeight: 700 }}>Summary (English) *</label>
                    <textarea
                      rows={2}
                      required
                      value={editingNews.summary?.en || ''}
                      onChange={(e) => setEditingNews({ ...editingNews, summary: { ...editingNews.summary, en: e.target.value } })}
                      style={{ width: '100%', padding: '8px', border: '1px solid var(--border-medium)' }}
                    />
                  </div>

                  <div>
                    <label style={{ fontSize: '0.82rem', fontWeight: 700 }}>సారాంశం (తెలుగు) *</label>
                    <textarea
                      rows={2}
                      required
                      value={editingNews.summary?.te || ''}
                      onChange={(e) => setEditingNews({ ...editingNews, summary: { ...editingNews.summary, te: e.target.value } })}
                      style={{ width: '100%', padding: '8px', border: '1px solid var(--border-medium)', fontFamily: 'var(--font-telugu)' }}
                    />
                  </div>

                  <div>
                    <label style={{ fontSize: '0.82rem', fontWeight: 700 }}>Full Article Content (English) *</label>
                    <textarea
                      rows={4}
                      required
                      value={editingNews.content?.en || ''}
                      onChange={(e) => setEditingNews({ ...editingNews, content: { ...editingNews.content, en: e.target.value } })}
                      style={{ width: '100%', padding: '8px', border: '1px solid var(--border-medium)' }}
                    />
                  </div>

                  <div>
                    <label style={{ fontSize: '0.82rem', fontWeight: 700 }}>పూర్తి ప్రకటన పాఠం (తెలుగు) *</label>
                    <textarea
                      rows={4}
                      required
                      value={editingNews.content?.te || ''}
                      onChange={(e) => setEditingNews({ ...editingNews, content: { ...editingNews.content, te: e.target.value } })}
                      style={{ width: '100%', padding: '8px', border: '1px solid var(--border-medium)', fontFamily: 'var(--font-telugu)' }}
                    />
                  </div>

                  <div style={{ display: 'flex', gap: '10px' }}>
                    <button type="submit" className="btn btn-primary btn-sm">Save & Publish</button>
                    <button type="button" onClick={() => setEditingNews(null)} className="btn btn-outline btn-sm">Cancel</button>
                  </div>
                </form>
              </div>
            )}

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {news.map((item) => (
                <div
                  key={item._id}
                  style={{
                    backgroundColor: '#FFFFFF',
                    padding: '16px 20px',
                    borderRadius: 'var(--radius-xs)',
                    border: '1px solid var(--border-subtle)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '16px',
                  }}
                >
                  <div>
                    <strong style={{ color: 'var(--accent-navy)', fontSize: '1rem' }}>{item.title?.en}</strong>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                      Published: {new Date(item.publishedAt).toLocaleDateString()}
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button onClick={() => setEditingNews(item)} className="btn btn-outline btn-sm" style={{ padding: '6px 10px' }}>
                      <Edit size={14} />
                    </button>
                    <button onClick={() => handleDeleteNews(item._id)} className="btn btn-outline btn-sm" style={{ padding: '6px 10px', color: '#D95D1E', borderColor: '#D95D1E' }}>
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 8. CITIZEN MESSAGES TAB */}
        {activeTab === 'messages' && (
          <div>
            <h1 style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--accent-navy)', marginBottom: '24px' }}>
              Citizen Grievances & Inquiries ({messages.length})
            </h1>

            {messages.length === 0 ? (
              <p style={{ color: 'var(--text-muted)' }}>No inquiries recorded yet.</p>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {messages.map((msg) => (
                  <div
                    key={msg._id}
                    style={{
                      backgroundColor: '#FFFFFF',
                      padding: '24px',
                      borderRadius: 'var(--radius-xs)',
                      border: '1px solid var(--border-subtle)',
                      boxShadow: 'var(--shadow-sm)',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '10px', marginBottom: '12px' }}>
                      <div>
                        <span style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--accent-navy)' }}>{msg.fullName}</span>
                        <span style={{ fontSize: '0.88rem', color: 'var(--accent-saffron)', marginLeft: '12px' }}>{msg.phone}</span>
                        {msg.email && <span style={{ fontSize: '0.84rem', color: 'var(--text-muted)', marginLeft: '12px' }}>{msg.email}</span>}
                      </div>

                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <select
                          value={msg.status}
                          onChange={(e) => handleUpdateMessageStatus(msg._id, e.target.value)}
                          style={{
                            padding: '4px 10px',
                            borderRadius: 'var(--radius-xs)',
                            fontSize: '0.82rem',
                            fontWeight: 700,
                            border: '1px solid var(--border-medium)',
                          }}
                        >
                          <option value="New">New</option>
                          <option value="Under Review">Under Review</option>
                          <option value="Resolved">Resolved</option>
                        </select>

                        <button
                          onClick={() => handleDeleteMessage(msg._id)}
                          style={{ color: '#D95D1E', padding: '4px' }}
                          title="Delete message"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>

                    <div style={{ fontSize: '0.82rem', color: 'var(--accent-green)', fontWeight: 600, marginBottom: '6px' }}>
                      Mandal/Area: {msg.mandalOrArea || 'Not specified'} | Date: {new Date(msg.createdAt).toLocaleString()}
                    </div>

                    <div style={{ fontWeight: 600, color: 'var(--text-primary)', marginBottom: '8px' }}>
                      Subject: {msg.subject}
                    </div>

                    <p style={{ fontSize: '0.92rem', color: 'var(--text-secondary)', lineHeight: 1.6, backgroundColor: 'var(--bg-secondary)', padding: '12px 16px', borderRadius: 'var(--radius-xs)' }}>
                      {msg.message}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminDashboard;
