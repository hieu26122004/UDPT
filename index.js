class ChordNode {
  constructor(id, m) {
    this.id = id;
    this.m = m;
    this.finger = new Array(m).fill(null);
  }
  updateFingerTable(nodes) {
    for (let i = 0; i < this.m; i++) {
      let start = (this.id + Math.pow(2, i)) % Math.pow(2, this.m);
      this.finger[i] = Chord.findSuccessor(start, nodes);
    }
  }
}

class Chord {
  constructor(m) {
    this.m = m;
    this.nodes = [];
  }

  addNode(id) {
    let node = new ChordNode(id, this.m);
    this.nodes.push(node);
    this.nodes.sort((a, b) => a.id - b.id);
    this.nodes.forEach((n) => n.updateFingerTable(this.nodes));
  }

  static findSuccessor(key, nodes) {
    for (let node of nodes) {
      if (node.id >= key) {
        return node;
      }
    }

    return nodes[0];
  }

  findResponsibleNode(key) {
    let hash = key % Math.pow(2, this.m);
    return Chord.findSuccessor(hash, this.nodes);
  }

  printFingerTables() {
    this.nodes.forEach((node) => {
      console.log(`Finger table của nút ${node.id}:`);
      node.finger.forEach((f, index) => {
        console.log(
          `  Start: ${
            (node.id + Math.pow(2, index)) % Math.pow(2, this.m)
          } -> Successor: ${f.id}`
        );
      });
    });
  }
}

const chord = new Chord(3);
chord.addNode(0);
chord.addNode(1);
chord.addNode(3);
chord.addNode(5);
chord.addNode(7);

chord.printFingerTables();

let keys = [2, 6, 7, 8];
keys.forEach((key) => {
  let responsibleNode = chord.findResponsibleNode(key);
  console.log(
    `Khóa ${key} được chịu trách nhiệm bởi nút ${responsibleNode.id}`
  );
});
