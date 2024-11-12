import { useState, useEffect } from 'react';

interface Log {
  timestamp: number;
  message: string;
}

interface JobStatusCounts {
  SUBMITTED: number;
  PENDING: number;
  STARTING: number;
  RUNNING: number;
  SUCCEEDED: number;
  FAILED: number;
}

interface WebSocketData {
  logs: Log[];
  jobStatusCounts: JobStatusCounts;
  totalVectors: number;
  totalDocuments: number;
  vectorsWritten: number;
  documentsIngested: number;
  sourceDestinationEmbedding: string;
}

export const useWebSocket = () => {
  const [data, setData] = useState<WebSocketData | null>(null);
  const [loading, setLoading] = useState(true);
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const websocketUrl = `wss://websocket-url-here/dev`; // Enter websocket url here from CDK deployment
    const websocket = new WebSocket(websocketUrl);

    websocket.onopen = () => {
      console.log('WebSocket connection established');
      setIsConnected(true);

      const initialMessage = {
        action: 'initialCheck',
        data: 'Please fetch the current job status and logs.',
      };
      websocket.send(JSON.stringify(initialMessage));
    };

    websocket.onmessage = (event) => {
      console.log('Received WebSocket message:', event.data);
      try {
        const parsedData = JSON.parse(event.data);
        if (parsedData.type === 'initialCheckResponse') {
          console.log('Initial connection data received');
          setData({
            logs: parsedData.logs || [],
            jobStatusCounts: parsedData.jobStatusCounts || {
              SUBMITTED: 0,
              PENDING: 0,
              STARTING: 0,
              RUNNING: 0,
              SUCCEEDED: 0,
              FAILED: 0,
            },
            totalVectors: parsedData.totalVectors || 0,
            totalDocuments: parsedData.totalDocuments || 0,
            vectorsWritten: parsedData.vectorsWritten || 0,
            documentsIngested: parsedData.documentsIngested || 0,
            sourceDestinationEmbedding: parsedData.sourceArn || '||',
          });

          setLoading(false);
        }

        if (Array.isArray(parsedData.logs)) {
          setData((prevData) => ({
            ...prevData!,
            logs: updateLogs(prevData?.logs || [], parsedData.logs),
          }));
        }

        if (parsedData.totalVectors !== undefined) {
          setData((prevData) => ({
            ...prevData!,
            totalVectors: parsedData.totalVectors,
          }));
        }

        if (parsedData.totalDocuments !== undefined) {
          setData((prevData) => ({
            ...prevData!,
            totalDocuments: parsedData.totalDocuments,
          }));
        }

        if (parsedData.vectorsWritten !== undefined) {
          setData((prevData) => ({
            ...prevData!,
            vectorsWritten: parsedData.vectorsWritten,
          }));
        }

        if (parsedData.documentsIngested !== undefined) {
          setData((prevData) => ({
            ...prevData!,
            documentsIngested: parsedData.documentsIngested,
          }));
        }

        if (parsedData.jobStatusCounts) {
          setData((prevData) => ({
            ...prevData!,
            jobStatusCounts: parsedData.jobStatusCounts,
          }));
        }

        if (parsedData.sourceDestinationEmbedding !== undefined) {
          setData((prevData) => ({
            ...prevData!,
            sourceDestinationEmbedding: parsedData.sourceDestinationEmbedding,
          }));
        }

      } catch (error) {
        console.error('Error parsing WebSocket message:', error);
      }
    };

    websocket.onclose = () => {
      console.log('WebSocket connection closed');
      setIsConnected(false);
    };

    websocket.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    setSocket(websocket);

    return () => {
      if (websocket.readyState === WebSocket.OPEN) {
        websocket.close();
      }
    };
  }, []);

  const updateLogs = (prevLogs: Log[], newLogs: Log[]): Log[] => {
    const uniqueLogs = [
      ...prevLogs.filter(
        (log) =>
          !newLogs.some(
            (newLog) => newLog.timestamp === log.timestamp && newLog.message === log.message
          )
      ),
      ...newLogs,
    ];

    uniqueLogs.sort((a, b) => b.timestamp - a.timestamp);
    return uniqueLogs.slice(0, 10);
  };

  return { data, loading, isConnected };
};
