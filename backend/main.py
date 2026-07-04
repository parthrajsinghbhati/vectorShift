from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Dict

app = FastAPI()

# Enable CORS for frontend origin
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Pydantic schemas
class PipelineNode(BaseModel):
    id: str

class PipelineEdge(BaseModel):
    source: str
    target: str

class PipelineRequest(BaseModel):
    nodes: List[PipelineNode]
    edges: List[PipelineEdge]

class PipelineResponse(BaseModel):
    num_nodes: int
    num_edges: int
    is_dag: bool

def check_is_dag(nodes: List[PipelineNode], edges: List[PipelineEdge]) -> bool:
    # Build adjacency list
    adj: Dict[str, List[str]] = {node.id: [] for node in nodes}
    for edge in edges:
        if edge.source in adj:
            adj[edge.source].append(edge.target)
        else:
            adj[edge.source] = [edge.target]
            
    # Visited states: 0 = unvisited, 1 = visiting, 2 = visited
    state: Dict[str, int] = {node_id: 0 for node_id in adj}
    
    def has_cycle(u: str) -> bool:
        state[u] = 1 # visiting
        for v in adj.get(u, []):
            if state.get(v, 0) == 1:
                return True # cycle detected (back-edge)
            if state.get(v, 0) == 0:
                if has_cycle(v):
                    return True
        state[u] = 2 # visited
        return False

    for node_id in adj:
        if state[node_id] == 0:
            if has_cycle(node_id):
                return False # Cycle detected, not a DAG
                
    return True # No cycles, it is a DAG

@app.get('/')
def read_root():
    return {'Ping': 'Pong'}

@app.post('/pipelines/parse', response_model=PipelineResponse)
def parse_pipeline(request: PipelineRequest):
    num_nodes = len(request.nodes)
    num_edges = len(request.edges)
    is_dag = check_is_dag(request.nodes, request.edges)
    return PipelineResponse(
        num_nodes=num_nodes,
        num_edges=num_edges,
        is_dag=is_dag
    )
