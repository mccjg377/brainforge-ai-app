import React, { useState, useEffect, useRef } from 'react';
import { Hash, Home, BookOpen, TrendingUp, CreditCard, User, LogOut, Send, Sparkles } from 'lucide-react';

// Simple Router Component
const Router = ({ children }) => {
  const [currentPath, setCurrentPath] = useState(window.location.hash.slice(1) || '/');

  useEffect(() => {
    const handleHashChange = () => {
      setCurrentPath(window.location.hash.slice(1) || '/');
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigate = (path) => {
    window.location.hash = path;
  };

  return <>{React.Children.map(children, child => 
    React.cloneElement(child, { currentPath, navigate })
  )}</>;
};

// Navigation Bar Component
const NavBar = ({ isLoggedIn, onLogout, navigate }) => {
  if (!isLoggedIn) return null;

  return (
    <nav className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center space-x-8">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                BrainForge AI
              </span>
            </div>
            <div className="hidden md:flex space-x-4">
              <button onClick={() => navigate('/dashboard')} className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-indigo-600 flex items-center space-x-1">
                <Home className="w-4 h-4" />
                <span>ダッシュボード</span>
              </button>
              <button onClick={() => navigate('/learning')} className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-indigo-600 flex items-center space-x-1">
                <BookOpen className="w-4 h-4" />
                <span>AIチューター</span>
              </button>
              <button onClick={() => navigate('/marketing')} className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-indigo-600 flex items-center space-x-1">
                <TrendingUp className="w-4 h-4" />
                <span>マーケティング</span>
              </button>
              <button onClick={() => navigate('/plans')} className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-indigo-600 flex items-center space-x-1">
                <CreditCard className="w-4 h-4" />
                <span>プラン</span>
              </button>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 text-sm text-gray-700">
              <User className="w-4 h-4" />
              <span>demo@brainforge.ai</span>
            </div>
            <button onClick={onLogout} className="px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg flex items-center space-x-1">
              <LogOut className="w-4 h-4" />
              <span>ログアウト</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

// Landing Page
const LandingPage = ({ navigate }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <div className="flex justify-center mb-8">
            <div className="w-20 h-20 bg-white rounded-2xl flex items-center justify-center shadow-2xl">
              <Sparkles className="w-12 h-12 text-indigo-600" />
            </div>
          </div>
          <h1 className="text-6xl font-bold text-white mb-6">
            BrainForge AI
          </h1>
          <p className="text-2xl text-white/90 mb-4">
            AI駆動型パーソナライズド学習プラットフォーム
          </p>
          <p className="text-xl text-white/80 mb-12 max-w-2xl mx-auto">
            あなた専属のAIチューターが、一人ひとりに最適化された学習体験を提供します
          </p>
          <button 
            onClick={() => navigate('/login')}
            className="px-8 py-4 bg-white text-indigo-600 rounded-xl text-lg font-semibold hover:bg-gray-50 shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all"
          >
            ログインして始める
          </button>
        </div>
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { icon: BookOpen, title: 'パーソナライズド学習', desc: 'あなたのペースと興味に合わせた学習' },
            { icon: Sparkles, title: 'AI チューター', desc: '24/7いつでも質問に答えます' },
            { icon: TrendingUp, title: '進捗追跡', desc: '学習の進捗を可視化して管理' }
          ].map((feature, i) => (
            <div key={i} className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 text-white">
              <feature.icon className="w-12 h-12 mb-4" />
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-white/80">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Login Page
const LoginPage = ({ navigate, onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email === 'demo@brainforge.ai' && password === 'demo') {
      onLogin();
      navigate('/dashboard');
    } else {
      setError('メールアドレスまたはパスワードが正しくありません');
    }
  };

  const handleDemoLogin = () => {
    setEmail('demo@brainforge.ai');
    setPassword('demo');
    setTimeout(() => {
      onLogin();
      navigate('/dashboard');
    }, 100);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-2xl p-8">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center mx-auto mb-4">
            <Sparkles className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900">ログイン</h2>
          <p className="text-gray-600 mt-2">BrainForge AIへようこそ</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              メールアドレス
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              placeholder="demo@brainforge.ai"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              パスワード
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              placeholder="demo"
              required
            />
          </div>
          {error && (
            <div className="text-red-600 text-sm bg-red-50 px-4 py-3 rounded-lg">
              {error}
            </div>
          )}
          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-lg font-semibold hover:from-indigo-600 hover:to-purple-700 transition-all"
          >
            ログイン
          </button>
        </form>
        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">または</span>
            </div>
          </div>
          <button
            onClick={handleDemoLogin}
            className="mt-6 w-full py-3 bg-gray-100 text-gray-700 rounded-lg font-semibold hover:bg-gray-200 transition-all"
          >
            デモアカウントでログイン
          </button>
        </div>
        <p className="mt-6 text-center text-sm text-gray-600">
          デモ: demo@brainforge.ai / demo
        </p>
      </div>
    </div>
  );
};

// Dashboard Page
const DashboardPage = ({ navigate }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">ダッシュボード</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">学習時間</h3>
              <BookOpen className="w-8 h-8 text-indigo-600" />
            </div>
            <p className="text-3xl font-bold text-indigo-600">24.5時間</p>
            <p className="text-sm text-gray-600 mt-2">今月の学習時間</p>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">完了したレッスン</h3>
              <Sparkles className="w-8 h-8 text-purple-600" />
            </div>
            <p className="text-3xl font-bold text-purple-600">12</p>
            <p className="text-sm text-gray-600 mt-2">累計レッスン数</p>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">学習進捗</h3>
              <TrendingUp className="w-8 h-8 text-pink-600" />
            </div>
            <p className="text-3xl font-bold text-pink-600">68%</p>
            <p className="text-sm text-gray-600 mt-2">コース進捗率</p>
          </div>
        </div>
        <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl shadow-lg p-8 text-white">
          <h2 className="text-2xl font-bold mb-4">AIチューターと学習を続けましょう</h2>
          <p className="text-white/90 mb-6">
            あなた専属のAIチューターが質問に答え、学習をサポートします
          </p>
          <button
            onClick={() => navigate('/learning')}
            className="px-6 py-3 bg-white text-indigo-600 rounded-lg font-semibold hover:bg-gray-50 transition-all"
          >
            AIチューターを開始
          </button>
        </div>
      </div>
    </div>
  );
};

// AI Tutor Page
const AITutorPage = () => {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: 'こんにちは！私はあなた専属のAIチューターです。何を学びたいですか？質問があればいつでも聞いてください。'
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const recommendedTopics = [
    'Pythonの基礎を教えて',
    'JavaScriptについて学びたい',
    '機械学習とは何ですか？',
    'データ分析の始め方'
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const getAIResponse = (userMessage) => {
    const lowerMessage = userMessage.toLowerCase();
    
    if (lowerMessage.includes('python')) {
      return `Pythonの基礎について説明します！

Pythonは初心者にも優しいプログラミング言語で、シンプルで読みやすい構文が特徴です。

基本的な変数の定義例：

\`\`\`python
# 変数の定義
name = "太郎"
age = 25
height = 175.5

# 出力
print(f"私の名前は{name}です。{age}歳で、身長は{height}cmです。")
\`\`\`

Pythonでは、データ型を明示的に宣言する必要がなく、とても直感的にコードが書けます。`;
    } else if (lowerMessage.includes('javascript') || lowerMessage.includes('js')) {
      return `JavaScriptの基礎について説明します！

JavaScriptはWebブラウザで動作するプログラミング言語で、インタラクティブなWebサイトを作成できます。

基本的な関数定義の例：

\`\`\`javascript
// 関数の定義
function greet(name) {
  return \`こんにちは、\${name}さん！\`;
}

// アロー関数
const add = (a, b) => a + b;

// 使用例
console.log(greet("太郎"));
console.log(add(5, 3));
\`\`\`

JavaScriptはフロントエンドだけでなく、Node.jsを使ってサーバーサイドでも使用できます。`;
    } else if (lowerMessage.includes('機械学習')) {
      return `機械学習について説明します！

機械学習は、コンピュータがデータからパターンを学習し、予測や判断を行う技術です。

主な3つの種類：

**1. 教師あり学習**
正解ラベル付きのデータから学習します。例：スパムメール判定、画像分類

**2. 教師なし学習**
ラベルなしのデータからパターンを発見します。例：顧客のグループ化、異常検知

**3. 強化学習**
試行錯誤を通じて最適な行動を学習します。例：ゲームAI、ロボット制御

機械学習は、Pythonのライブラリ（scikit-learn, TensorFlow, PyTorchなど）を使って実装できます。`;
    } else {
      return `とても良い質問ですね！

学習への意欲が素晴らしいです。具体的に知りたいことがあれば、遠慮なく質問してください。

プログラミング、データサイエンス、アルゴリズムなど、様々なトピックについてサポートできます。どの分野から始めたいですか？`;
    }
  };

  const handleSend = (messageText = input) => {
    if (!messageText.trim()) return;

    const userMessage = { role: 'user', content: messageText };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      const aiResponse = getAIResponse(messageText);
      setMessages(prev => [...prev, { role: 'assistant', content: aiResponse }]);
      setIsTyping(false);
    }, 1000);
  };

  const handleTopicClick = (topic) => {
    handleSend(topic);
  };

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-6 shadow-lg">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center space-x-3">
            <Sparkles className="w-8 h-8" />
            <div>
              <h1 className="text-2xl font-bold">AIチューター</h1>
              <p className="text-white/80 text-sm">何でも質問してください</p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        <div className="max-w-4xl mx-auto space-y-4">
          {messages.map((message, index) => (
            <div key={index} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[80%] rounded-2xl p-4 ${
                message.role === 'user' 
                  ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white' 
                  : 'bg-white shadow-sm border border-gray-200'
              }`}>
                <div className="whitespace-pre-wrap break-words">
                  {message.content.split('```').map((part, i) => {
                    if (i % 2 === 1) {
                      const lines = part.split('\n');
                      const language = lines[0];
                      const code = lines.slice(1).join('\n');
                      return (
                        <div key={i} className="my-2 bg-gray-900 rounded-lg p-4 overflow-x-auto">
                          <div className="text-xs text-gray-400 mb-2">{language}</div>
                          <pre className="text-sm text-gray-100"><code>{code}</code></pre>
                        </div>
                      );
                    }
                    return <span key={i}>{part}</span>;
                  })}
                </div>
              </div>
            </div>
          ))}

          {messages.length === 1 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-6">
              {recommendedTopics.map((topic, index) => (
                <button
                  key={index}
                  onClick={() => handleTopicClick(topic)}
                  className="p-4 bg-white border-2 border-gray-200 rounded-xl hover:border-indigo-500 hover:bg-indigo-50 transition-all text-left"
                >
                  <span className="text-gray-700 font-medium">{topic}</span>
                </button>
              ))}
            </div>
          )}

          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-white shadow-sm border border-gray-200 rounded-2xl p-4">
                <div className="flex space-x-2">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </div>

      <div className="border-t bg-white p-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex space-x-3">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              placeholder="質問を入力してください..."
              className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
            <button
              onClick={() => handleSend()}
              className="px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-xl hover:from-indigo-600 hover:to-purple-700 transition-all flex items-center space-x-2"
            >
              <Send className="w-5 h-5" />
              <span>送信</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Placeholder Pages
const MarketingPage = () => (
  <div className="min-h-screen bg-gray-50 py-12">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-4">マーケティング</h1>
      <p className="text-gray-600">このページは現在準備中です。</p>
    </div>
  </div>
);

const PlansPage = () => (
  <div className="min-h-screen bg-gray-50 py-12">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-4">プラン</h1>
      <p className="text-gray-600">このページは現在準備中です。</p>
    </div>
  </div>
);

// Main App Component
export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    window.location.hash = '/';
  };

  return (
    <Router>
      {({ currentPath, navigate }) => {
        // Redirect to login if not logged in and trying to access protected routes
        const protectedRoutes = ['/dashboard', '/learning', '/marketing', '/plans'];
        if (!isLoggedIn && protectedRoutes.includes(currentPath)) {
          setTimeout(() => navigate('/login'), 0);
        }

        return (
          <div className="min-h-screen">
            <NavBar isLoggedIn={isLoggedIn} onLogout={handleLogout} navigate={navigate} />
            {currentPath === '/' && <LandingPage navigate={navigate} />}
            {currentPath === '/login' && <LoginPage navigate={navigate} onLogin={handleLogin} />}
            {currentPath === '/dashboard' && isLoggedIn && <DashboardPage navigate={navigate} />}
            {currentPath === '/learning' && isLoggedIn && <AITutorPage />}
            {currentPath === '/marketing' && isLoggedIn && <MarketingPage />}
            {currentPath === '/plans' && isLoggedIn && <PlansPage />}
          </div>
        );
      }}
    </Router>
  );
}