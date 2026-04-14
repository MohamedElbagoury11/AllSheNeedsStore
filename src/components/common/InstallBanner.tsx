import React from 'react';
import { X, Download } from 'lucide-react';
import { useInstallPrompt } from '../../hooks/useInstallPrompt';
import { useTranslation } from 'react-i18next';
import onlyLogo from '../../assets/OnlyLogo.png';

const InstallBanner: React.FC = () => {
  const { t } = useTranslation();
  const { showBanner, handleInstall, handleDismiss } = useInstallPrompt();

  if (!showBanner) return null;

  return (
    <div
      role="banner"
      className="install-banner"
      style={{
        background: 'linear-gradient(135deg, #fdf2f8 0%, #fce7f3 50%, #fbcfe8 100%)',
        borderBottom: '1px solid #f9a8d4',
        padding: '10px 16px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '12px',
        zIndex: 60,
        position: 'relative',
        boxShadow: '0 2px 8px rgba(236, 72, 153, 0.12)',
        animation: 'slideDown 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
      }}
    >
      <style>{`
        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-100%); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .install-btn {
          display: flex;
          align-items: center;
          gap: 6px;
          background: linear-gradient(135deg, #ec4899, #db2777);
          color: white;
          border: none;
          border-radius: 20px;
          padding: 7px 16px;
          font-size: 13px;
          font-weight: 700;
          cursor: pointer;
          white-space: nowrap;
          transition: transform 0.15s, box-shadow 0.15s;
          box-shadow: 0 2px 8px rgba(236, 72, 153, 0.4);
          letter-spacing: 0.01em;
        }
        .install-btn:hover {
          transform: translateY(-1px);
          box-shadow: 0 4px 14px rgba(236, 72, 153, 0.5);
        }
        .install-btn:active { transform: scale(0.97); }
        .install-dismiss {
          background: none;
          border: none;
          cursor: pointer;
          color: #9d174d;
          padding: 4px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: background 0.15s;
          flex-shrink: 0;
        }
        .install-dismiss:hover { background: rgba(236, 72, 153, 0.12); }
      `}</style>

      {/* Left: Logo + Text */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', minWidth: 0 }}>
        <img
          src={onlyLogo}
          alt="allsheneeds"
          style={{ height: '36px', width: 'auto', objectFit: 'contain', flexShrink: 0 }}
        />
        <div style={{ minWidth: 0 }}>
          <p style={{ margin: 0, fontWeight: 700, fontSize: '13px', color: '#831843', lineHeight: 1.2 }}>
            {t('install.title')}
          </p>
          <p style={{ margin: 0, fontSize: '11.5px', color: '#9d174d', lineHeight: 1.3 }}>
            {t('install.subtitle')}
          </p>
        </div>
      </div>

      {/* Right: Install + Dismiss */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0 }}>
        <button
          id="pwa-install-button"
          className="install-btn"
          onClick={handleInstall}
          aria-label={t('install.install_label')}
        >
          <Download size={14} />
          {t('install.button')}
        </button>
        <button
          className="install-dismiss"
          onClick={handleDismiss}
          aria-label={t('install.dismiss_label')}
        >
          <X size={16} />
        </button>
      </div>
    </div>
  );
};

export default InstallBanner;
