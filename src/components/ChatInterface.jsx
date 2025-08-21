import React, { useState, useRef, useEffect } from 'react';
import './ChatInterface.css';
import OpenAI from 'openai';
import ReactDOMServer from 'react-dom/server';

// Import all documentation components
import IntroOverview from '../pages/IntroOverview';
import IntroArchitecture from '../pages/IntroArchitecture';
import ComponentsWorkload from '../pages/ComponentsWorkload';
import ComponentsService from '../pages/ComponentsService';
import ComponentsStorage from '../pages/ComponentsStorage';
import ComponentsConfiguration from '../pages/ComponentsConfiguration';
import SetupControlplane from '../pages/SetupControlplane';
import SetupWorkernode from '../pages/SetupWorkernode';
import SetupMinikube from '../pages/SetupMinikube';
import RancherSetupAddCluster from '../pages/RancherSetupAddCluster';
import RancherUsingUI from '../pages/RancherUsingUI';
import AIAssistantMCPServer from '../pages/AIAssistantMCPServer';

const ChatInterface = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'assistant',
      content: 'Xin chào! Tôi là Kubernetes AI Assistant. Tôi có thể giúp bạn tìm hiểu về Kubernetes, giải thích các khái niệm, và hỗ trợ bạn trong việc quản lý cluster. Bạn có thể hỏi tôi bất kỳ câu hỏi nào về Kubernetes!',
      timestamp: new Date()
    }
  ]);
  const [isLoadingFromStorage, setIsLoadingFromStorage] = useState(true);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [easterEggState, setEasterEggState] = useState('normal'); // 'normal', 'waiting_name', 'completed', 'used'

  const messagesEndRef = useRef(null);
  const openai = useRef(null);

  // Documentation URLs mapping for search
  const documentationUrls = [
    { 
      path: "/Introduction/overview", 
      title: "Kubernetes Overview", 
      description: "Introduction to Kubernetes, basic concepts, overview of container orchestration", 
      componentName: "IntroOverview" 
    },
    { 
      path: "/Introduction/architecture", 
      title: "Kubernetes Architecture", 
      description: "Kubernetes architecture, master node, worker node, cluster components", 
      componentName: "IntroArchitecture" 
    },
    { 
      path: "/Kubernetes_Components/workload", 
      title: "Workload Components", 
      description: "Pods, Deployments, ReplicaSets, DaemonSets, StatefulSets, Jobs, CronJobs", 
      componentName: "ComponentsWorkload" 
    },
    { 
      path: "/Kubernetes_Components/service", 
      title: "Service Components", 
      description: "Services, Ingress, Load Balancer, NodePort, ClusterIP, networking", 
      componentName: "ComponentsService" 
    },
    { 
      path: "/Kubernetes_Components/storage", 
      title: "Storage Components", 
      description: "Volumes, PersistentVolumes, PersistentVolumeClaims, StorageClass, storage management", 
      componentName: "ComponentsStorage" 
    },
    { 
      path: "/Kubernetes_Components/configuration", 
      title: "Configuration Components", 
      description: "ConfigMaps, Secrets, environment variables, configuration management", 
      componentName: "ComponentsConfiguration" 
    },
    { 
      path: "/Set_Up_Cluster/controlplane", 
      title: "Control Plane Setup", 
      description: "Setting up Kubernetes control plane, master node configuration, kubeadm init", 
      componentName: "SetupControlplane" 
    },
    { 
      path: "/Set_Up_Cluster/workernode", 
      title: "Worker Node Setup", 
      description: "Setting up Kubernetes worker nodes, joining nodes to cluster, kubeadm join", 
      componentName: "SetupWorkernode" 
    },
    { 
      path: "/Set_Up_Cluster/minikube", 
      title: "Minikube Setup", 
      description: "Setting up Minikube for local development, single-node cluster", 
      componentName: "SetupMinikube" 
    },
    { 
      path: "/Rancher_UI/setup-and-add-cluster", 
      title: "Rancher Setup and Add Cluster", 
      description: "Setting up Rancher, adding clusters to Rancher, cluster management", 
      componentName: "RancherSetupAddCluster" 
    },
    { 
      path: "/Rancher_UI/use-ui-to-apply-yaml", 
      title: "Rancher UI for YAML", 
      description: "Using Rancher UI to apply YAML files, resource management through UI", 
      componentName: "RancherUsingUI" 
    },
    { 
      path: "/K8s_AI_Assistant", 
      title: "Kubernetes AI Assistant", 
      description: "AI Assistant for Kubernetes, MCP Server, automation tools", 
      componentName: "AIAssistantMCPServer" 
    }
  ];

  // Component mapping
  const componentMap = {
    IntroOverview,
    IntroArchitecture,
    ComponentsWorkload,
    ComponentsService,
    ComponentsStorage,
    ComponentsConfiguration,
    SetupControlplane,
    SetupWorkernode,
    SetupMinikube,
    RancherSetupAddCluster,
    RancherUsingUI,
    AIAssistantMCPServer
  };

  // Custom websearch function to search in documentation
  const custom_websearch = async (search_query) => {
    try {
      console.log("Executing custom_websearch with query:", search_query);

      // Split the query into individual keywords
      const lowerCaseQuery = search_query.toLowerCase();
      const searchKeywords = lowerCaseQuery.split(/\s+/);
      console.log("Search keywords:", searchKeywords);

      // Calculate a score for each doc based on how many keywords match
      const scoredDocs = documentationUrls.map(doc => {
        const titleLower = doc.title.toLowerCase();
        const descLower = doc.description.toLowerCase();
        const pathLower = doc.path.toLowerCase();

        let score = 0;

        // Count how many keywords match in each field
        for (const keyword of searchKeywords) {
          if (keyword.length < 3) continue; // Skip very short keywords

          if (titleLower.includes(keyword)) score += 3; // Title matches are most important
          if (descLower.includes(keyword)) score += 2; // Description matches are next
          if (pathLower.includes(keyword)) score += 1; // Path matches are least important
        }

        return { doc, score };
      });

      // Sort by score, highest first
      scoredDocs.sort((a, b) => b.score - a.score);

      // Log the top matches for debugging
      console.log("Top matching docs:",
        scoredDocs
          .filter(item => item.score > 0)
          .slice(0, 3)
          .map(item => `${item.doc.title} (score: ${item.score})`)
      );

      // Get the best match (if any)
      const bestMatch = scoredDocs.length > 0 && scoredDocs[0].score > 0 ? scoredDocs[0].doc : null;

      let componentToRender = null;
      let title = "Search Results";
      let url = window.location.origin;

      if (bestMatch) {
        // If a matching component is found, render it
        const ComponentToUse = componentMap[bestMatch.componentName];
        if (ComponentToUse) {
          componentToRender = React.createElement(ComponentToUse);
          title = bestMatch.title;
          url = window.location.origin + bestMatch.path;

          console.log("Found component:", bestMatch.componentName);
        } else {
          console.log("Component not found in componentMap:", bestMatch.componentName);
        }
      } else {
        console.log("No matching component found for query:", search_query);
      }

      if (!componentToRender) {
        // Fallback if no matching component is found
        return JSON.stringify({
          results: [
            {
              title: "No matching information found",
              url: window.location.origin,
              content: "No information matching your query was found. Please try again with different keywords."
            }
          ]
        });
      }

      // Render component to HTML string
      const htmlString = ReactDOMServer.renderToString(componentToRender);

      // Return result as JSON string
      return JSON.stringify({
        results: [
          {
            title: title,
            url: url,
            content: htmlString
          }
        ]
      });
    } catch (error) {
      console.error("Error in custom_websearch:", error);
      return JSON.stringify({
        results: [
          {
            title: "Search Error",
            url: window.location.origin,
            content: "An error occurred during search: " + error.message
          }
        ]
      });
    }
  };

  // Define tools for API - Ollama compatible format
  const tools = [
    {
      type: "function",
      function: {
        name: "custom_websearch",
        description: "Search for information in the Kubernetes Documentation. Use this function when user asks about Kubernetes concepts, setup, components, or any related topics.",
        parameters: {
          type: "object",
          properties: {
            search_query: {
              type: "string",
              description: "The search query to find relevant Kubernetes documentation. Use keywords related to the user's question."
            }
          },
          required: ["search_query"],
          additionalProperties: false
        }
      }
    }
  ];

  // Create system prompt
  const createSystemPrompt = () => {
    const baseUrl = window.location.origin;
    const urlList = documentationUrls.map(url =>
      `- ${baseUrl}${url.path} - ${url.title} (${url.componentName}): ${url.description}`
    ).join('\n');

    return `You are a Kubernetes Documentation Assistant. Your job is to help users with Kubernetes-related questions.

IMPORTANT: For EVERY question, you MUST use the custom_websearch function to search the documentation before answering.

Available documentation topics:
${urlList}

Your workflow:
1. Only answer questions related to Kubernetes, container orchestration, cluster management, and related topics.
2. If a question is not related to Kubernetes documentation, politely decline to answer and guide the user to ask about relevant topics.
3. When you need to search for information in the documentation, use the custom_websearch tool with relevant keywords.
4. In the search_query, use exact keywords from component names or page titles for more accurate searches.
5. Based on the results from custom_websearch, provide specific and clear instructions to the user.
6. Always cite your sources using links (e.g., "Source: Kubernetes Documentation").
7. Use HTML syntax to format your answers, including:
   - <b>Bold</b> for titles or important keywords
   - <i>Italics</i> for emphasis
   - <code>Code</code> for code or file/variable names
   - <ul><li>Unordered lists when needed</li></ul>
   - <ol><li>Ordered lists when needed</li></ol>
   - <table>Tables when needed to display structured data</table>
   - <a href="url">Links in the format [text](url)</a>
   - <pre><code>Code blocks for YAML or commands</code></pre>
Always answer based on accurate information from the documentation and respond in Vietnamese.`;
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Reset easter egg when chat is closed
  useEffect(() => {
    if (!isOpen) {
      setEasterEggState('normal');
    }
  }, [isOpen]);

  // Load chat history from localStorage ONCE on mount
  useEffect(() => {
    console.log('=== LOADING FROM LOCALSTORAGE (MOUNT) ===');
    const savedMessages = localStorage.getItem('k8s-chatHistory');
    console.log('Loading from localStorage:', savedMessages ? 'Found data' : 'No data');
    
    if (savedMessages) {
      try {
        const parsedMessages = JSON.parse(savedMessages);
        console.log('Parsed messages:', parsedMessages);
        
        if (Array.isArray(parsedMessages) && parsedMessages.length > 0) {
          // Convert timestamp strings back to Date objects
          const messagesWithDates = parsedMessages.map(msg => ({
            ...msg,
            timestamp: msg.timestamp ? new Date(msg.timestamp) : new Date()
          }));
          console.log('Setting messages from localStorage:', messagesWithDates.length, 'messages');
          setMessages(messagesWithDates);
        }
      } catch (error) {
        console.error("Error loading chat history from localStorage:", error);
      }
    } else {
      console.log('No saved messages, keeping default welcome message');
    }
    
    // Mark loading complete after a small delay to ensure state update
    setTimeout(() => {
      setIsLoadingFromStorage(false);
      console.log('Loading from localStorage completed');
    }, 100);
  }, []); // Only run once on mount

  // Initialize OpenAI client
  useEffect(() => {
    const ollamaBase = import.meta.env.VITE_OLLAMA_BASE || 'http://192.168.10.32:11434/v1';
    
    // Configure OpenAI SDK to use with Ollama (no API key needed for local Ollama)
    openai.current = new OpenAI({
      baseURL: ollamaBase,
      apiKey: 'ollama', // Ollama doesn't require real API key, just a placeholder
      dangerouslyAllowBrowser: true
    });
  }, []);

  // Save messages to localStorage whenever they change (but not during initial load)
  useEffect(() => {
    // Skip saving during initial load from localStorage
    if (isLoadingFromStorage) {
      console.log('Skipping save - still loading from localStorage');
      return;
    }
    
    // Don't save if it's just the initial welcome message
    if (messages.length > 1 || (messages.length === 1 && messages[0].id !== 1)) {
      try {
        localStorage.setItem('k8s-chatHistory', JSON.stringify(messages));
        console.log('Chat history saved to localStorage:', messages.length, 'messages');
      } catch (error) {
        console.error('Error saving chat history:', error);
      }
    } else {
      console.log('Skipping save - only default welcome message');
    }
  }, [messages, isLoadingFromStorage]);

  // Save chat when page is about to unload (F5, close tab, etc.)
  useEffect(() => {
    const handleBeforeUnload = () => {
      if (messages.length > 0) {
        try {
          localStorage.setItem('k8s-chatHistory', JSON.stringify(messages));
          console.log('Chat history saved before page unload');
        } catch (error) {
          console.error('Error saving chat history on unload:', error);
        }
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    
    // Cleanup event listener
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage = {
      id: Date.now(),
      type: 'user',
      content: inputMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    const currentInput = inputMessage;
    setInputMessage('');
    setIsLoading(true);

    try {
      // Easter egg logic (priority over AI)
      if (easterEggState === 'normal' && currentInput.toLowerCase().includes('tôi chuẩn bị đi phỏng vấn rồi nhưng hơi sợ')) {
        setTimeout(() => {
          const aiResponse = {
            id: Date.now() + 1,
            type: 'assistant',
            content: 'Bạn tên gì?',
            timestamp: new Date()
          };
          setMessages(prev => [...prev, aiResponse]);
          setEasterEggState('waiting_name');
          setIsLoading(false);
        }, 1000);
        return;
      } else if (easterEggState === 'waiting_name' && currentInput.toLowerCase().includes('linh')) {
        setTimeout(() => {
          const aiResponse1 = {
            id: Date.now() + 1,
            type: 'assistant',
            content: 'Be brave',
            timestamp: new Date(),
            isEasterEgg: true
          };
          const aiResponse2 = {
            id: Date.now() + 2,
            type: 'assistant',
            content: 'Good luck Linh 🍀',
            timestamp: new Date(),
            isEasterEgg: true
          };
          setMessages(prev => [...prev, aiResponse1, aiResponse2]);
          setEasterEggState('used');
          setIsLoading(false);
        }, 1000);
        return;
      }

      // Check if OpenAI client is available
      if (openai.current) {
        const systemPrompt = createSystemPrompt();

        // Prepare conversation history for API
        const conversationHistory = messages.map(msg => ({
          role: msg.type === 'user' ? 'user' : 'assistant',
          content: msg.content
        }));

        // Add current message
        conversationHistory.push({
          role: 'user',
          content: currentInput
        });

        // Use tool calling instead of web search
        const model = import.meta.env.VITE_MODEL_NAME || 'gpt-oss:20b';

        console.log("Sending request to Ollama with model:", model);

        // Force tool calling - if model doesn't support tools, we'll handle manually
        let completion;
        let useTools = true;
        
        try {
          completion = await openai.current.chat.completions.create({
            model: model,
            messages: [
              { role: 'system', content: systemPrompt },
              ...conversationHistory
            ],
            tools: tools, // Use defined tools
            tool_choice: {
              "type": "function",
              "function": {"name": "custom_websearch"}
            }, // Force using custom_websearch tool
            extra_headers: {
              "HTTP-Referer": window.location.href,
              "X-Title": "Kubernetes Documentation Assistant"
            }
          });
        } catch (toolError) {
          console.log("Tool calling not supported, manually executing search:", toolError);
          useTools = false;
          
          // If tools not supported, manually execute search and get AI response
          console.log("Manually executing custom_websearch for query:", currentInput);
          const searchResult = await custom_websearch(currentInput);
          
          // Create a modified system prompt with search results
          const searchData = JSON.parse(searchResult);
          const enhancedPrompt = `${systemPrompt}

SEARCH RESULTS for query "${currentInput}":
${searchResult}

Based on the search results above, provide a comprehensive answer to the user's question. Use HTML formatting and cite the source.`;

          completion = await openai.current.chat.completions.create({
            model: model,
            messages: [
              { role: 'system', content: enhancedPrompt },
              ...conversationHistory
            ],
            temperature: 0.7,
            max_tokens: 2000
          });
        }

        // Log raw response from Ollama
        console.log("=== RAW RESPONSE FROM OLLAMA API ===");
        console.log(JSON.stringify(completion, null, 2));

        // Get assistant response
        const assistantResponse = completion.choices[0].message;

        // Check if there are tool calls
        if (useTools && assistantResponse.tool_calls && assistantResponse.tool_calls.length > 0) {
          console.log("=== TOOL CALLS DETECTED ===");

          // Initialize array to store tool responses
          const toolResponses = [];

          // Process each tool call
          for (const toolCall of assistantResponse.tool_calls) {
            if (toolCall.function.name === 'custom_websearch') {
              try {
                // Parse arguments
                const args = JSON.parse(toolCall.function.arguments);
                const searchQuery = args.search_query;

                console.log("Executing custom_websearch with query:", searchQuery);

                // Execute custom_websearch
                const searchResult = await custom_websearch(searchQuery);

                // Add result to responses array
                toolResponses.push({
                  role: 'tool',
                  tool_call_id: toolCall.id,
                  name: 'custom_websearch',
                  content: searchResult
                });

              } catch (error) {
                console.error("Error processing tool call:", error);

                // Even when error occurs, must return response for this tool call
                toolResponses.push({
                  role: 'tool',
                  tool_call_id: toolCall.id,
                  name: 'custom_websearch',
                  content: JSON.stringify({
                    results: [
                      {
                        title: "Search Error",
                        url: window.location.origin,
                        content: "An error occurred during search: " + error.message
                      }
                    ]
                  })
                });
              }
            }
          }

          // Send all tool results back to AI for processing
          try {
                         // Create a more explicit follow-up prompt with search results
             const searchResultsText = toolResponses.map(response => {
               try {
                 const data = JSON.parse(response.content);
                 return data.results.map(result => 
                   `TITLE: ${result.title}\nURL: ${result.url}\nCONTENT: ${result.content}`
                 ).join('\n\n');
               } catch (e) {
                 return response.content;
               }
             }).join('\n\n');

             const followUpPrompt = `${systemPrompt}

🚨 CRITICAL INSTRUCTION - FINAL RESPONSE REQUIRED:
You have already searched the documentation. Below are the search results you found:

${searchResultsText}

NOW YOU MUST:
1. Read the search results above carefully
2. Provide your final answer in Vietnamese with HTML formatting
3. DO NOT call any tools
4. DO NOT search again
5. DO NOT make any more tool_calls
6. Just answer the user's question based on the search results provided

This is your FINAL response. No more searching.`;

             const followUpCompletion = await openai.current.chat.completions.create({
               model: model,
               messages: [
                 { role: 'system', content: followUpPrompt },
                 ...conversationHistory,
                 assistantResponse,
                 ...toolResponses  // Send all tool responses
               ],
              // NO tools in follow-up to force final answer
              temperature: 0.3, // Lower temperature for more focused responses
              max_tokens: 2000
            });

            // Log result from API after sending tool results
            console.log("=== FOLLOW-UP RESPONSE WITH TOOL RESULTS ===");
            console.log(JSON.stringify(followUpCompletion, null, 2));

            // Update response from AI
            const finalResponse = followUpCompletion.choices[0].message;
            
            console.log("=== CHECKING FOLLOW-UP FOR TOOL CALLS ===");
            console.log("Has tool_calls:", !!finalResponse.tool_calls);
            console.log("Content:", finalResponse.content);

                         // Check if follow-up still has tool_calls (shouldn't happen but handle it)
             if (finalResponse.tool_calls && finalResponse.tool_calls.length > 0) {
               console.warn("⚠️ Follow-up still has tool_calls, this shouldn't happen. Using fallback response.");
               
               // Try to extract any content from the response before tool_calls
               let fallbackContent = "Xin lỗi, tôi đang gặp vấn đề kỹ thuật trong việc xử lý câu hỏi của bạn. Vui lòng thử lại hoặc đặt câu hỏi khác.";
               
               if (finalResponse.content && finalResponse.content.trim()) {
                 // If there's some content, use it but add a warning
                 fallbackContent = finalResponse.content + "\n\n<i>Lưu ý: Câu trả lời này có thể chưa hoàn chỉnh do lỗi kỹ thuật.</i>";
               } else {
                 // If no content, try to create a response from search results
                 try {
                   const searchData = JSON.parse(toolResponses[0].content);
                   if (searchData.results && searchData.results.length > 0) {
                     const result = searchData.results[0];
                     fallbackContent = `<b>Thông tin từ tài liệu:</b><br/><br/>${result.content}<br/><br/><i>Nguồn: <a href="${result.url}" target="_blank">${result.title}</a></i>`;
                   }
                 } catch (e) {
                   console.error("Error parsing search results for fallback:", e);
                 }
               }
               
               // Create a fallback response
               const assistantMessage = {
                 id: Date.now() + 1,
                 type: 'assistant',
                 content: fallbackContent,
                 timestamp: new Date(),
                 isHtml: true
               };
               setMessages(prevMessages => [...prevMessages, assistantMessage]);
             } else {
              // Normal response
              const assistantMessage = {
                id: Date.now() + 1,
                type: 'assistant',
                content: finalResponse.content || "Xin lỗi, tôi không thể tạo ra câu trả lời. Vui lòng thử lại.",
                timestamp: new Date(),
                isHtml: true  // Flag to indicate HTML content
              };
              setMessages(prevMessages => [...prevMessages, assistantMessage]);
            }
          } catch (error) {
            console.error("Error in follow-up API call:", error);
            const assistantMessage = {
              id: Date.now() + 1,
              type: 'assistant',
              content: "Đã xảy ra lỗi khi xử lý yêu cầu của bạn: " + error.message,
              timestamp: new Date()
            };
            setMessages(prevMessages => [...prevMessages, assistantMessage]);
          }
        } else {
          // No tool calls detected (this should only happen if tools aren't supported)
          // The response should already include search results from enhanced prompt
          console.log("No tool calls, but search was already executed manually");
          
          const assistantMessage = {
            id: Date.now() + 1,
            type: 'assistant',
            content: assistantResponse.content,
            timestamp: new Date(),
            isHtml: true
          };
          setMessages(prevMessages => [...prevMessages, assistantMessage]);
        }
      } else {
        // Fallback if no API key
        setTimeout(() => {
          const assistantMessage = {
            id: Date.now() + 1,
            type: 'assistant',
            content: "Tôi không thể kết nối với API. Vui lòng kiểm tra cấu hình API key của bạn.",
            timestamp: new Date()
          };
          setMessages(prevMessages => [...prevMessages, assistantMessage]);
        }, 1000);
      }
    } catch (error) {
      console.error('Error calling API:', error);

      // Add error message
      const errorMessage = {
        id: Date.now() + 1,
        type: 'assistant',
        content: `Đã xảy ra lỗi: ${error.message || 'Không thể kết nối với API'}`,
        timestamp: new Date()
      };
      setMessages(prevMessages => [...prevMessages, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // Function to clear chat history
  const clearChat = () => {
    localStorage.removeItem('k8s-chatHistory');
    console.log('Chat history cleared from localStorage');
    
    // Reset messages state with default welcome message
    setMessages([{
      id: 1,
      type: 'assistant',
      content: 'Xin chào! Tôi là Kubernetes AI Assistant. Tôi có thể giúp bạn tìm hiểu về Kubernetes, giải thích các khái niệm, và hỗ trợ bạn trong việc quản lý cluster. Bạn có thể hỏi tôi bất kỳ câu hỏi nào về Kubernetes!',
      timestamp: new Date()
    }]);
    setEasterEggState('normal');
  };

  // Debug function - can be called from browser console
  window.debugChatStorage = () => {
    const saved = localStorage.getItem('k8s-chatHistory');
    console.log('=== DEBUG CHAT STORAGE ===');
    console.log('Raw data:', saved);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        console.log('Parsed data:', parsed);
        console.log('Message count:', parsed.length);
      } catch (e) {
        console.log('Parse error:', e);
      }
    }
    console.log('Current messages state:', messages.length);
  };

  // Function to render message content
  const renderMessageContent = (message) => {
    if (message.type === 'user') {
      return <div className="message-content">{message.content}</div>;
    } else {
      // For assistant messages, render as HTML if isHtml flag is set
      if (message.isHtml) {
        return (
          <div
            className="message-content html-content"
            dangerouslySetInnerHTML={{ __html: message.content }}
          />
        );
      } else {
        return <div className="message-content">{message.content}</div>;
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div className="chat-overlay">
      <div className={`chat-container ${easterEggState === 'used' ? 'easter-egg-active' : ''}`}>
        {/* Chat Header */}
        <div className="chat-header">
          <div className="chat-title">
            <span className="chat-icon">🤖</span>
            <span>Kubernetes AI Assistant</span>
          </div>
          <div className="chat-actions">
            <button className="chat-action-btn" onClick={clearChat} title="Clear chat history">
              🗑️
            </button>
            <button className="chat-action-btn" onClick={onClose} title="Close chat">
              ✕
            </button>
          </div>
        </div>

        {/* Chat Messages */}
        <div className="chat-messages">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`chat-message ${message.type === 'user' ? 'user-message' : 'assistant-message'} ${message.isEasterEgg ? 'easter-egg-message' : ''}`}
            >
              {renderMessageContent(message)}
              <div className="message-timestamp">
                {message.timestamp && message.timestamp instanceof Date 
                  ? message.timestamp.toLocaleTimeString() 
                  : new Date().toLocaleTimeString()}
              </div>
            </div>
          ))}
          
          {isLoading && (
            <div className="chat-message assistant-message">
              <div className="message-content">
                <div className="typing-indicator">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>

        {/* Chat Input */}
        <div className="chat-input-container">
          <textarea
            className="chat-input"
            placeholder="Type your message..."
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            rows="1"
          />
          <button 
            className="chat-send-btn"
            onClick={handleSendMessage}
            disabled={!inputMessage.trim() || isLoading}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;
