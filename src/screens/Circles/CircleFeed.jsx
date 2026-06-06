import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus } from 'lucide-react';
import PageWrapper from '../../components/layout/PageWrapper';
import TopBar from '../../components/layout/TopBar';
import WhisperCard from '../../components/features/WhisperCard';
import { mockPosts } from '../../data/mockPosts';
import { mockCircles } from '../../data/mockCircles';

export default function CircleFeed({ navigate, params }) {
  const [activeTab, setActiveTab] = useState('Posts');
  const [circles, setCircles] = useState(mockCircles);
  const [dbPosts, setDbPosts] = useState(mockPosts);

  useEffect(() => {
    fetch('/api/circles')
      .then(res => res.json())
      .then(data => { if (data && data.length > 0) setCircles(data); })
      .catch(err => console.error(err));

    fetch('/api/posts')
      .then(res => res.json())
      .then(data => { if (data && data.length > 0) setDbPosts(data); })
      .catch(err => console.error(err));
  }, []);
  
  // Find circle from params, default to first if missing
  const circleId = params?.id ? (typeof params.id === 'string' ? parseInt(params.id, 10) : params.id) : circles[0].id;
  const circle = circles.find(c => c.id === circleId) || circles[0];
  
  // Filter mock posts roughly matching the circle category
  const posts = dbPosts.filter(p => p.circle === circle.name || p.circle === circle.category);
  // If filter is too strict and returns empty, just use all mock posts for demo
  const displayPosts = posts.length > 0 ? posts : dbPosts;

  const tabs = ['Posts', 'Events', 'Resources', 'Members'];

  return (
    <PageWrapper>
      <TopBar 
        title={circle.name}
        subtitle={`${circle.members.toLocaleString()} members`}
        showBack 
        onBack={() => navigate('circles')} 
      />

      {/* Tabs */}
      <div style={{
        display: 'flex',
        gap: 'var(--space-md)',
        borderBottom: '1px solid rgba(44,24,16,0.1)',
        marginBottom: 'var(--space-lg)',
      }}>
        {tabs.map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            style={{
              background: 'none',
              border: 'none',
              padding: '8px 4px',
              fontFamily: 'var(--font-body)',
              fontSize: '15px',
              fontWeight: activeTab === tab ? '600' : '400',
              color: activeTab === tab ? 'var(--color-coffee)' : 'var(--color-charcoal-muted)',
              cursor: 'pointer',
              position: 'relative',
            }}
          >
            {tab}
            {activeTab === tab && (
              <motion.div
                layoutId="tab-indicator"
                style={{
                  position: 'absolute',
                  bottom: -1,
                  left: 0,
                  right: 0,
                  height: '2px',
                  background: circle.color,
                }}
              />
            )}
          </button>
        ))}
      </div>

      {/* Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
        >
          {activeTab === 'Posts' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }}>
              {displayPosts.map((post, i) => (
                <WhisperCard 
                  key={post.id} 
                  post={{...post, circleColor: circle.color, circle: undefined}} // Hide "in Circle" label since we are in it
                  index={i} 
                />
              ))}
            </div>
          )}
          
          {activeTab !== 'Posts' && (
            <div style={{ padding: 'var(--space-xl) 0', textAlign: 'center', color: 'var(--color-charcoal-muted)' }}>
              <p>Nothing here yet.</p>
              <p style={{ fontSize: '13px', marginTop: '4px' }}>Be the first to add to {activeTab.toLowerCase()}.</p>
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Floating Action Button */}
      {activeTab === 'Posts' && (
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate('create-post', { circleId: circle.id })}
          style={{
            position: 'absolute',
            bottom: '24px',
            right: '24px',
            width: '56px',
            height: '56px',
            borderRadius: '50%',
            background: 'var(--color-coffee)',
            color: '#FAF3E0',
            border: 'none',
            boxShadow: '0 8px 24px rgba(44,24,16,0.3)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            zIndex: 10,
          }}
        >
          <Plus size={28} />
        </motion.button>
      )}
    </PageWrapper>
  );
}
